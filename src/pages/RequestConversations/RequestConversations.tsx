import React, { FC, useState, useEffect, useContext } from 'react';
import { Box, Text, Button, Heading, DropButton, ResponsiveContext } from 'grommet';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth0 } from '../../AuthenticationProvider';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { MyRequestResponse } from '../../services/TaskService/models/MyRequestsResponse';
import { request } from 'https';
import { useParams, useHistory } from 'react-router-dom';
import { TaskConversations } from '../../services/TaskService/models/TaskConversations';
import styles from '../../styles.module.scss';
import { FormPreviousLink } from 'grommet-icons';
import { RouteName, path } from '../../routing';
import { Avatar } from '../../assets/Avatar';

interface RequestConversationsParams {
    id: string;
}

export const RequestConversations: FC = () => {
    const size = useContext(ResponsiveContext);
    const params = useParams<RequestConversationsParams>();
    const { getTokenSilently, isAuthenticated } = useAuth0();
    const taskService = new TaskService();
    const history = useHistory();

    const [ task, setTask ] = useState<TaskConversations>();
    const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated && !task) {
            getTokenSilently().then(token => {
                taskService.getChatsByTask(params.id, token).then(task => {
                    setTask(task);
                });
            });
        }
    }, [isAuthenticated]);

    const confirmDelete = () => {
        getTokenSilently().then(token => {
            taskService.deleteTask({ taskId: task?.id }, token).then(() => {
                history.push(path(RouteName.Messages));
            });
        });
    }
    
    return (    
        <Box background="neutral" style={{ minHeight: "calc(100vh)" }} >
            <Box flex  margin={{ top: size == "small" ? "75px" : "xlarge", horizontal: "auto", bottom: size == "small" ? "none" : "xlarge" }} width="xlarge">
                <Box direction="row" pad="small" background="white" border={{ side: "bottom", color: "#eeeeee" }} justify="between">
                    <Box>
                        <Box direction="row" className={styles.btnOutline} onClick={() => history.push(path(RouteName.Messages))}>
                            <Box>
                                <FormPreviousLink color="primary" />
                            </Box>
                            <Box>
                                {"Back"}
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Button primary
                            color="red"
                            className={styles.btn}
                            onClick={() => setConfirmOpen(true)}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
                {confirmOpen &&
                    <Box direction="row" pad="small" background="white" border={{ side: "bottom", color: "#eeeeee" }} fill>
                        <Box 
                            onClick={() => setConfirmOpen(false)} 
                            pad="medium" align="center" 
                            fill
                        >
                            <Text color="primary">Cancel</Text>
                        </Box>
                        <Box 
                            onClick={confirmDelete} 
                            pad="medium" align="center" 
                            fill
                            background="red"

                        >
                            <Text color="white">Confirm Delete</Text>
                        </Box>
                    </Box>
                }
                <Box style={{ minHeight: "calc(100vh - 143px)" }}>
                    {task &&
                        <Box>
                            <Box elevation={task.offers.length ? "xsmall" : "small"} pad={{ horizontal: "medium", bottom: "large" }} background="white">
                                <Heading level={4}>{task.title}</Heading>
                                {task.description}
                            </Box>
                            <Box direction="row" elevation="xsmall" background="white" justify="between" pad={{ vertical: "medium", horizontal: "large" }} border={{ side: "top", color: "tertiary" }}>
                                <Box>
                                    <Text color="primary">Hero Offerings</Text>
                                </Box>
                                <Box background="secondary" pad={{ horizontal: "small"}} round="large">
                                    <Text color="white">{task.offers.length}</Text>
                                </Box>
                            </Box>
                            <Box pad="medium" >
                                {task.offers?.map(offer => 
                                    <Box pad="medium" background="white" onClick={() => history.push(path(RouteName.Chat, { chatId: offer.chatId }))} >
                                        <img width="50px" src={Avatar(offer.pictureId)} />
                                        {offer.firstName}                       
                                    </Box>
                                )}
                                {task.offers.length == 0 &&
                                    <Box alignSelf="center"  pad={{ top: "xlarge" }}>
                                        No one has offered help for your request yet.
                                    </Box>
                                }
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
}