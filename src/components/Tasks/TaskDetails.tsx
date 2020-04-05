import React, { useState, FC } from 'react';
import { Box, Text, Heading } from 'grommet';
import * as assets from "../../assets";
import css from "./Task.module.scss";
import src from '*.bmp';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Chatter } from '../Chat/Chatter';
import { Avatar } from '../../assets/Avatar';

interface TaskDetailsProps {
    task?: TasksResponse;
}

export const TaskDetails: FC<TaskDetailsProps> = (props) => {
    const { task } = props;
    return (
        <Box>
            <Box pad="medium" animation={["fadeIn", "slideUp"]}>
                <Box fill align="center" pad={{ vertical: "medium"} }>
                    <img width="120px" src={Avatar(task?.requester.pictureId || 1)}></img>
                    <Box className={css.userScore}>
                        {task?.requester.score}
                    </Box>
                    <Box margin={{ top: "xsmall" }}>
                        <Text color="primary" size="large">{task?.requester.firstName}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}