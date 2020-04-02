import React, { useState, FC } from 'react';
import { Box, Text, Heading } from 'grommet';
import * as assets from "../../assets";
import css from "./Task.module.scss";
import src from '*.bmp';

interface TaskProps {    
    date: string;
    description: string;
    id: string;
    pictureUrl?: string;
    title: string;
    location: string;
}

export const Task: FC<TaskProps> = (props) => {
    const description = props.description.length > 140 ? props.description.substring(0, 140) + "..." : props.description;

    return (
        <div className={css.taskWrapper}>
            <Box flex direction="row">
                <Box width="80%" pad="small">
                    <Box>
                        <Heading margin={"none"} level={4} color="primary" size="large">{props.title}</Heading>
                    </Box>
                    <Box>
                        <Text size="small">Posted on 3/28/20 - <Text color="secondary" size="small">{props.location}</Text></Text>
                    </Box>
                    <Box margin={{ top: "medium" }}>
                        <Text size="small">{description}</Text>
                    </Box>
                </Box>
                <Box align="center" width="20%" pad={{ vertical: "medium"} }>
                    <img className={css.avatar} src={assets.Avatar1}></img>
                    <Box className={css.userScore}>
                        22
                    </Box>
                    <Box margin={{ top: "xsmall" }}>
                        <Text color="primary" size="large">Chris</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}