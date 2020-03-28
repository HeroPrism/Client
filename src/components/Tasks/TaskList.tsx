import React, { useState, FC, useEffect, useRef, RefObject } from 'react';
import { Box } from 'grommet';
import css from "./TaskList.module.scss";
import { TaskService } from '../../services/TaskService/TaskService';
import { TasksRequest } from '../../services/TaskService/models/TasksRequest';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Task } from './Task';
import ReactPaginate from 'react-paginate';

const TASKS_PER_PAGE = 7;

interface TaskListProps {
    page: number;
}

export const TaskList: FC<TaskListProps> = (props) => {
    const taskService = new TaskService();
    const [ tasks, setTasks ] = useState<TasksResponse[]>([]);
    const [ displayedTasks, setDisplayedTasks ] = useState<TasksResponse[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    //TODO: Change this to come from bounds of the map.
    const bounds : TasksRequest = {
        bounds: {
            nw: {
                latitude: 31.34324,
                longitude: -111.34342
            },
            se: {
                latitude: 31.23343,
                longitude: -111.23434
            }
        }
    }

    useEffect(() => {
        taskService.getTasks(bounds).then(tasks => { 
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
        <Box ref={ref}>
            {displayedTasks.map(task =>
                <Task
                    date={task.date}
                    description={task.description}
                    id={task.id}
                    pictureUrl={task.pictureUrl}
                    title={task.title}
                    userName={task.user.name}
                    userScore={task.user.score}
                    location={task.location}
                />                
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