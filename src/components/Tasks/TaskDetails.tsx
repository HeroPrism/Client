import React, { useState, FC, useContext } from 'react';
import { Box, Text, Heading, ResponsiveContext } from 'grommet';
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
    const size = useContext(ResponsiveContext);

    return (
        <Box animation={["fadeIn", "slideUp"]} background="neutral">
            <Box fill style={{ minHeight: "calc(100vh - 143px)" }}>
                <Box background="white" pad="large" fill align="center" elevation="small">
                    <img width="120px" src={Avatar(task?.requester.pictureId || 1)}></img>
                    <Box className={css.userScore}>
                        {task?.requester.score}
                    </Box>
                    <Box margin={{ top: "xsmall" }}>
                        <Text color="secondary">{task?.requester.firstName}</Text>
                    </Box>
                </Box>
                <Box pad={size == "small" ? "medium" : "small" }>
                    <Box background="white" pad="medium" round="small">
                        <Box margin={{ bottom: "medium" }}>
                            <Text color="secondary">{task?.title}</Text>
                        </Box>
                        <Box>
                            <Text size="small">{task?.description}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}