import React, { useState, FC } from 'react';
import { Box, Text, Heading } from 'grommet';
import * as assets from "../../assets";
import css from "./Task.module.scss";
import src from '*.bmp';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';

interface TaskDetailsProps {
    task?: TasksResponse;
}

export const TaskDetails: FC<TaskDetailsProps> = (props) => {
    const { task } = props;
    return (
        <Box>
            <Box pad="medium" animation={["fadeIn", "slideUp"]}>
                {task?.description}
            </Box>
        </Box>
    );
}