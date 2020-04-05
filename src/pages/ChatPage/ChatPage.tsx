import React, { FC, useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { useParams } from 'react-router-dom';
import { Chatter } from '../../components/Chat/Chatter';
import { useAuth0 } from '../../AuthenticationProvider';

export interface ChatParams {
    chatId: string;
}

export const ChatPage: FC = () => {
    const params = useParams<ChatParams>();
    const { dbUser, user, isAuthenticated } = useAuth0();

    useEffect(() => {

    }, [dbUser, user]);
    
    return (
        <Box margin={{ top: "75px" }} style={{ maxHeight: "calc(100vh - 75px)"}}>
            {isAuthenticated && dbUser && user &&
                <div>
                    <Chatter 
                        chatId={params.chatId}
                        chatUserToken={dbUser?.chatToken.token}
                        chatUser={{
                            id: user.sub.replace("|", "_"),
                            name: dbUser.firstName,
                            image: ""
                        }}
                    />
                </div>
            }
            
        </Box>
    );
}