import React, { FC, useState, useEffect } from 'react';
import { Box, Text } from 'grommet';

export enum MessageType {
    Request,
    Offer
}

export const Messages: FC = () => {
    const [ activeMessageType, setActiveMessageType ] = useState<MessageType>(MessageType.Request);
    const [ requests, setRequests ] = useState([]);
    const [ offers, setOffers ] = useState([]);

    useEffect(() => {

    }, [activeMessageType]);
    
    return (    
        <Box flex    margin={{ top: "75px" }}>
            <Box direction="row" background="white" border={{ side: "bottom", color: "#eeeeee" }} fill>
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
                <Box>
                    Requests
                </Box>
            }
            {activeMessageType == MessageType.Offer &&
                <Box>
                    Offeres
                </Box>
            }
        </Box>
    );
}