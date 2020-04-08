import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import css from "./Task.module.scss";
import { User } from '../../services/TaskService/models/User';
import { Avatar } from '../../assets/Avatar';

interface TaskProps {    
    date: string;
    description: string;
    id: string;
    pictureUrl?: string;
    title: string;
    location: string;
    user: User;
}

export const Task: FC<TaskProps> = (props) => {
    const description = props.description.length > 140 ? props.description.substring(0, 140) + "..." : props.description;
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 

    const formatDate = (dateString: string) : string  => {
        const date = new Date(dateString);
        const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date);

        return `${mo}/${da}/${ye}`;
    }

    return (
        <div className={css.taskWrapper}>
            <Box flex direction="row">
                <Box width="80%" pad="small">
                    <Box>
                        <Text margin={"none"}  color="secondary" size="medium">{props.title}</Text>
                    </Box>
                    <Box>
                        <Text size="small">Posted on {formatDate(props.date)} - <Text color="secondary" size="small">{props.location}</Text></Text>
                    </Box>
                    <Box margin={{ top: "medium" }}>
                        <Text size="small">{description}</Text>
                    </Box>
                </Box>
                <Box title={`${props.user.firstName} is a level ${props.user.score} hero`} align="center" width="20%" pad={{ vertical: "medium"} }>
                    <img alt="task user avatar" className={css.avatar} src={Avatar(props.user.pictureId)}></img>
                    <Box className={css.userScore}>
                        {props.user.score}
                    </Box>
                    <Box margin={{ top: "xsmall" }}>
                        <Text color="secondary" size="medium">{props.user.firstName}</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}