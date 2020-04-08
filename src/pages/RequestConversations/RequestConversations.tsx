import React, { FC, useState, useEffect, useContext } from 'react';
import { Box, Text, Button, Heading, ResponsiveContext } from 'grommet';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth0 } from '../../AuthenticationProvider';
import { useParams, useHistory } from 'react-router-dom';
import { TaskConversations, Offers } from '../../services/TaskService/models/TaskConversations';
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
    const [ markComplete, setMarkComplete ] = useState<boolean>(false);
    const [ selectedHero, setSelectedHero ] = useState<Offers | null>();

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

    const confirmMarkHero = (chatId: string) => {
        getTokenSilently().then(token => {
            taskService.completeTask({ chatId: chatId }, token).then(() => {
                history.push(path(RouteName.Messages));
            });
        });
    }

    const onHeroClick = (offer: Offers) => {
        if (!markComplete) {
            history.push(path(RouteName.Chat, { chatId: offer.chatId }))
        } else {
            setSelectedHero(offer);
        }
    }

    const onCancelMarkComplete = () => {
        setSelectedHero(null);
        setMarkComplete(false);
    }

    const onCancelSelectedUser = () => {
        setSelectedHero(null);
    }
    
    return (    
        <Box background="neutral" style={{ minHeight: "calc(100vh)" }} >
            <Box flex  margin={{ top: size === "small" ? "75px" : "xlarge", horizontal: "auto", bottom: size === "small" ? "none" : "xlarge" }} width="xlarge">
                <Box direction="row" pad="small" background="white" border={{ side: "bottom", color: "#eeeeee" }} justify="between">
                    {!markComplete &&
                        <>
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
                        </>
                    }
                    {markComplete &&
                        <>
                            <Box>
                                <Box direction="row" className={styles.btnOutline} onClick={onCancelMarkComplete}>
                                    <Box>
                                        <FormPreviousLink color="primary" />
                                    </Box>
                                    <Box>
                                        Cancel
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                
                            </Box>
                        </>
                    }
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
                            {!markComplete &&
                                <>
                                    <Box elevation={task.offers.length ? "xsmall" : "small"} pad={{ horizontal: "medium", bottom: "large" }} background="white">
                                        <Heading level={4}>{task.title}</Heading>
                                        {task.description}
                                    </Box>
                                    <Box direction="row" elevation="xsmall" background="white" justify="between" pad={{ vertical: "medium", horizontal: "large" }} border={{ side: "top", color: "tertiary" }}>
                                        <Box direction="row" justify="center">
                                            <Text alignSelf="center" color="primary">Hero Offerings</Text>
                                            <Box alignSelf="center" margin={{ left: "medium" }} background="secondary" pad={{ horizontal: "small"}} round="large">
                                                <Text color="white">{task.offers.length}</Text>
                                            </Box>
                                        </Box>
                                        <Box>
                                            {task.offers.length > 0 &&
                                                <Button primary
                                                    color="primary"
                                                    className={styles.btn}
                                                    onClick={() => setMarkComplete(true)}
                                                >
                                                    Mark Complete
                                                </Button>
                                            }
                                        </Box>
                                    </Box>
                                </>
                            }
                            {markComplete &&
                                <Box elevation={task.offers.length ? "xsmall" : "small"} pad="medium" background="white">
                                    <Text textAlign="center" color="secondary">Select the user that helped.</Text>
                                </Box>
                            }
                            <Box pad="medium" >
                                {task.offers?.map(offer => 
                                    <Box key={task.id} pad="medium" background="white" onClick={() => onHeroClick(offer)} >
                                        {offer !== selectedHero &&
                                            <>
                                                <img alt="User Avatar" width="50px" src={Avatar(offer.pictureId)} />
                                                {offer.firstName}
                                            </>
                                        }
                                        {offer === selectedHero &&
                                            <Box>
                                                <Box align="center">
                                                    <Text>Mark {selectedHero.firstName} as the hero?</Text>
                                                </Box>
                                                <Box direction="row" pad="medium" justify="center">
                                                    <Box fill align="center" alignSelf="center">
                                                        <Text onClick={onCancelSelectedUser} color="red">Cancel</Text>
                                                    </Box>
                                                    <Box fill align="center" alignSelf="center">
                                                        <Button primary
                                                            color="primary"
                                                            className={styles.btn}
                                                            onClick={() => confirmMarkHero(offer.chatId)}
                                                        >
                                                            Confirm
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }            
                                    </Box>
                                )}
                                {task.offers.length === 0 &&
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