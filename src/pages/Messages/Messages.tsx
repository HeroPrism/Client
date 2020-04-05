import React, { FC, useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth0 } from '../../AuthenticationProvider';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { MyRequestResponse } from '../../services/TaskService/models/MyRequestsResponse';
import { request } from 'https';
import { useHistory } from 'react-router-dom';
import { RouteName, path } from '../../routing';

export enum MessageType {
    Request,
    Offer
}

export const Messages: FC = () => {
    const taskService = new TaskService();
    const history = useHistory();
    const [ activeMessageType, setActiveMessageType ] = useState<MessageType>(MessageType.Request);
    const { getTokenSilently, isAuthenticated } = useAuth0();
    const [ requests, setRequests ] = useState<MyRequestResponse[]>([]);
    const [ offers, setOffers ] = useState<TasksResponse[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            if (activeMessageType == MessageType.Request && requests.length == 0) {
                getTokenSilently().then(token => {
                    taskService.getRequests(token).then(r => {
                        setRequests(r);
                    });
                });
            }
            if (activeMessageType == MessageType.Offer && offers.length == 0) {
                getTokenSilently().then(token => {
                    taskService.getOffers(token).then(o => {
                        setOffers(o);
                    });
                });
            }
        }
    }, [activeMessageType, isAuthenticated]);

    const onRequestClick = (id: string) => {
        history.push(path(RouteName.RequestConversations, { id: id }));
    }
    
    return (    
        <Box flex  margin={{ top: "75px" }}>
            <Box direction="row" pad="small" background="white" border={{ side: "bottom", color: "#eeeeee" }} fill>
                <Box 
                    onClick={() => setActiveMessageType(MessageType.Request)} 
                    pad="medium" align="center" 
                    fill background={activeMessageType == MessageType.Request ? "primary" : "white"}
                >
                    <Text color={activeMessageType == MessageType.Request ? "white" : "#333333"}>My Requests</Text>
                </Box>
                <Box 
                    onClick={() => setActiveMessageType(MessageType.Offer)} 
                    pad="medium" align="center" 
                    fill 
                    background={activeMessageType == MessageType.Offer ? "primary" : "white"}
                >
                    <Text color={activeMessageType == MessageType.Offer ? "white" : "#333333"}>My Offers</Text>
                </Box>
            </Box>
            {activeMessageType == MessageType.Request &&
                <Box margin="small">
                    {requests?.map(request => 
                        <Box onClick={() => onRequestClick(request.id)} margin={{ bottom: "small" }} pad="large" border={{ side: "all", color: "tertiary" }}>
                            <Box direction="row" justify="between">
                                <Box alignSelf="center"><Text color="primary">{request.title}</Text></Box>
                                <Box alignSelf="center">
                                    <Box background="red" pad="xsmall" round="xsmall">
                                        <Text color="white">{request.status}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            }
            {activeMessageType == MessageType.Offer &&
                <Box margin="small">
                    Offers
                </Box>
            }
        </Box>
    );
}