import React, { useState, FC, useEffect, useRef, useContext } from 'react';
import { Box } from 'grommet';
import css from "./TaskList.module.scss";
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Task } from './Task';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../App';

const TASKS_PER_PAGE = 16;

interface TaskListProps {
    onSelect: (task: TasksResponse) => void;
}

export const TaskList: FC<TaskListProps> = (props) => {
    const app = useContext(AppContext);
    const [ displayedTasks, setDisplayedTasks ] = useState<TasksResponse[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDisplayedTasks(app.state.tasks.slice(app.state.page * TASKS_PER_PAGE, ((app.state.page + 1) * TASKS_PER_PAGE)));
    }, [app.state.tasks]);

    const onPageChange = (page: number) => {
        app.dispatch({ type: "SetPage", payload: page })
        setDisplayedTasks(app.state.tasks?.slice((page) * TASKS_PER_PAGE, ((page + 1) * TASKS_PER_PAGE)));
        
        if (ref.current != null) {
            ref.current.scrollIntoView();
        }
    }

    return (
        <>
            {!displayedTasks &&
                <Box fill style={{ height: "100%" }} background="green"></Box>
            }
            {displayedTasks &&
                <Box ref={ref} animation={["fadeIn", "slideUp"]}>
                    {displayedTasks?.map(task =>
                        <div onClick={() => props.onSelect(task)}>
                            <Task
                                key={task.id}
                                date={task.createDateTime}
                                description={task.description}
                                id={task.id}
                                title={task.title}
                                location={task.zipCode}
                                user={task.requester}
                            />       
                        </div>
                    )}
                    <Box margin="auto">
                        <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                initialPage={app.state.page || 0}
                                breakClassName={'break-me'}
                                pageCount={app.state.tasks && (app.state.tasks.length / TASKS_PER_PAGE)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                forcePage={app.state.page}
                                onPageChange={(data) => onPageChange(data.selected)}
                                containerClassName={css.pagination}
                                pageClassName={css.page}
                                activeClassName={css.active}
                                pageLinkClassName={css.pageButton}
                                nextClassName={css.paginate}
                                nextLinkClassName={css.paginateButton}
                                previousClassName={css.paginate}
                                previousLinkClassName={css.paginateButton}
                                disabledClassName={css.paginationDisabled}
                            />
                    </Box>
                </Box>
            }
        </>
    );
}