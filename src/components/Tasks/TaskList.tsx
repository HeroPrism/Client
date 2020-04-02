import React, { useState, FC, useEffect, useRef, RefObject, useContext } from 'react';
import { Box } from 'grommet';
import css from "./TaskList.module.scss";
import { TaskService } from '../../services/TaskService/TaskService';
import { TasksRequest } from '../../services/TaskService/models/TasksRequest';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Task } from './Task';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../App';

const TASKS_PER_PAGE = 16;

interface TaskListProps {
    page: number;
    tasks: TasksResponse[];
    onSelect: (task: TasksResponse) => void;
}

export const TaskList: FC<TaskListProps> = (props) => {
    const taskService = new TaskService();
    const app = useContext(AppContext);
    const [ tasks, setTasks ] = useState<TasksResponse[]>(props.tasks);
    const [ displayedTasks, setDisplayedTasks ] = useState<TasksResponse[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (app.state.bounds != undefined) {
            taskService.getTasks({ bounds: app.state.bounds }).then(tasks => { 
                app.dispatch({ type: "SetTasks", payload: tasks });
                setTasks(tasks);
                setDisplayedTasks(tasks.slice(props.page * TASKS_PER_PAGE, ((props.page + 1) * TASKS_PER_PAGE)));
                app.dispatch({ type: "SetPage", payload: props.page });
            });
        }
        
    }, [app.state.bounds ]);

    const onPageChange = (page: number) => {
        app.dispatch({ type: "SetPage", payload: page })
        setDisplayedTasks(tasks?.slice((page) * TASKS_PER_PAGE, ((page + 1) * TASKS_PER_PAGE)));
        
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
                                date={task.createdDateTime}
                                description={task.description}
                                id={task.id}
                                title={task.title}
                                location={task.zipCode}
                            />       
                        </div>       
                    )}
                    <Box margin="auto">
                        <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                initialPage={props.page || 0}
                                breakClassName={'break-me'}
                                pageCount={tasks && (tasks.length / TASKS_PER_PAGE)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                forcePage={props.page}
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