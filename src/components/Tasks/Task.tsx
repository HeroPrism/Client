import React, { useState, FC } from 'react';
import { Box, Text, Heading } from 'grommet';
import css from "./Task.module.scss";

interface TaskProps {    
    date: string;
    description: string;
    id: string;
    pictureUrl?: string;
    title: string;
    userName: string;
    userScore: number;
    location: string;
}

export const Task: FC<TaskProps> = (props) => {
    return (
        <div className={css.taskWrapper}>
            <Heading level={4}>{props.title}</Heading>
            <p>{props.description}</p>
            <p>{props.location}</p>
        </div>
    );
}