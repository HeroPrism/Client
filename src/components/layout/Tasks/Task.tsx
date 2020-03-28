import React, { useState, FC } from 'react';
import { Box } from 'grommet';

interface TaskProps {    
    date: string;
    description: string;
    id: string;
    pictureUrl: string;
    title: string;
    userName: string;
    location: string;
}

export const Task: FC<TaskProps> = (props) => {
    return (
        <Box border="all" margin="xsmall">
            {props.description}
        </Box>
    );
}