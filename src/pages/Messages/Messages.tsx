import React, { FC, useState, useEffect, useContext } from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth0 } from '../../AuthenticationProvider';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { MyRequestResponse } from '../../services/TaskService/models/MyRequestsResponse';
import { request } from 'https';
import { useHistory } from 'react-router-dom';
import { RouteName, path } from '../../routing';
import { MyOffersResponse } from '../../services/TaskService/models/MyOffersResponse';
import { Avatar } from '../../assets/Avatar';

export enum MessageType {
    Request,
    Offer
}

export const Messages: FC = () => {
    const size = useContext(ResponsiveContext);
    const taskService = new TaskService();
    const history = useHistory();
    const [ activeMessageType, setActiveMessageType ] = useState<MessageType>(MessageType.Request);
    const { getTokenSilently, isAuthenticated } = useAuth0();
    const [ requests, setRequests ] = useState<MyRequestResponse[]>([]);
    const [ offers, setOffers ] = useState<MyOffersResponse[]>([]);

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

    const formatDescription = (description: string) : string => {
        if (description.length > 70) {
            return `${description.substr(0, 70)}...`;
        }

        return description;
    }
    
    return (
        <Box background="neutral" style={{ minHeight: "calc(100vh)" }} >
            <Box flex  margin={{ top: size == "small" ? "75px" : "xlarge", horizontal: "auto", bottom: size == "small" ? "none" : "xlarge" }} width="xlarge" background="white">
                <Box direction="row" pad={"small"} background="white" border={{ side: "bottom", color: "#eeeeee" }} fill>
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
                            <Box onClick={() => onRequestClick(request.id)} margin={{ bottom: "small" }} pad={size == "small" ? "medium" : "small"} border={{ side: "all", color: "tertiary" }}>
                                <Box direction="row" justify="between">
                                    <Box alignSelf="center">
                                        <Text>{request.title}</Text>
                                    </Box>
                                    <Box alignSelf="center">
                                        <Box background="secondary" pad="xsmall" round="xsmall">
                                            <Text size="small" color="white">{request.status}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box margin={{ top: "medium" }}>{formatDescription(request.description)}</Box>
                            </Box>
                        )}
                    </Box>
                }
                {activeMessageType == MessageType.Offer &&
                    <Box margin="small">
                        {offers?.map(offer => 
                            <Box direction="row" onClick={() => history.push(path(RouteName.Chat, { chatId: offer.requester.chatId }))}>
                                <Box align="center" pad="medium" background="white" >
                                    <img width="50px" src={Avatar(offer.requester.pictureId)} />
                                    {offer.requester.firstName}                       
                                </Box>
                                <Box fill pad="medium">
                                    <Box>
                                        <Text color="primary">{offer.title}</Text>
                                    </Box>
                                </Box>
                            </Box>
                            
                        )}
                        {offers.length == 0 &&
                            <Box alignSelf="center"  pad={{ top: "xlarge" }}>
                                You haven't made an offers to help yet.
                            </Box>
                        }
                    </Box>
                }
            </Box>
        </Box>
    );
}