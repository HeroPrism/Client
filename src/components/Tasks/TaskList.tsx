import React, { useState, FC, useEffect, useRef, RefObject, useContext } from 'react';
import { Box } from 'grommet';
import css from "./TaskList.module.scss";
import { TaskService } from '../../services/TaskService/TaskService';
import { TasksRequest } from '../../services/TaskService/models/TasksRequest';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Task } from './Task';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../App';

const TASKS_PER_PAGE = 7;

interface TaskListProps {
    page: number;
    onSelect: (task: TasksResponse) => void;
}

export const TaskList: FC<TaskListProps> = (props) => {
    const taskService = new TaskService();
    const app = useContext(AppContext);
    const [ tasks, setTasks ] = useState<TasksResponse[]>([]);
    const [ displayedTasks, setDisplayedTasks ] = useState<TasksResponse[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    //TODO: Change this to come from bounds of the map.
    const bounds : TasksRequest = {
        bounds: {
            nw: {
                longitude: -112.9106,
                latitude: 35.6096
            },
            ne: {
                longitude: -109.8518,
                latitude: 35.5247
            },
            sw: {
                longitude: -112.8188,
                latitude: 33.7463
            },
            se: {
                longitude: -109.7558,
                latitude: 33.7186
            }
        }
    }

    useEffect(() => {
        taskService.getTasks(bounds).then(tasks => { 
            app.dispatch({ type: "SetTasks", payload: tasks })
            setTasks(tasks);
            setDisplayedTasks(tasks.slice(((props.page || 1) - 1) * TASKS_PER_PAGE, ((props.page || 1) * TASKS_PER_PAGE)));
        });
    }, []);

    const onPageChange = (page: number) => {
        setDisplayedTasks(tasks.slice((page) * TASKS_PER_PAGE, ((page + 1) * TASKS_PER_PAGE)));
        
        if (ref.current != null) {
            ref.current.scrollIntoView();
        }
    }

    return (
        <Box ref={ref} animation={["fadeIn", "slideUp"]}>
            {displayedTasks.map(task =>
                <div onClick={() => props.onSelect(task)}>
                    <Task
                        key={task.id}
                        date={task.createdDateTime}
                        description={task.description}
                        id={task.id}
                        title={task.title}
                        userName={task.user.name}
                        userScore={task.user.score}
                        location={task.zipCode}
                    />       
                </div>       
            )}
            <Box margin="auto">
                <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={tasks && (tasks.length / TASKS_PER_PAGE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
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
    );
}