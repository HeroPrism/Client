import React, { useState, FC, useEffect } from 'react';
import { Box, Text, Heading } from 'grommet';
import css from "./Task.module.scss";
import { TaskService } from '../../services/TaskService/TaskService';
import { TasksRequest } from '../../services/TaskService/models/TasksRequest';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Task } from './Task';

export const TaskList: FC = () => {
    const taskService = new TaskService();
    const [ tasks, setTasks ] = React.useState<TasksResponse[]>([]);

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
        taskService.getTasks(bounds).then(tasks => setTasks(tasks));
    }, []);

    return (
        <Box>
            {tasks.map(task =>
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
        </Box>
    );
}