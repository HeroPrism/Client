import React, { FC, useState, useEffect } from 'react';
import { Box, Text, Button } from 'grommet';
import { useParams, useHistory } from 'react-router-dom';
import { Chatter } from '../../components/Chat/Chatter';
import { useAuth0 } from '../../AuthenticationProvider';
import { FormPreviousLink } from 'grommet-icons';
import styles from '../../styles.module.scss';

export interface ChatParams {
    chatId: string;
}

export const ChatPage: FC = () => {
    const params = useParams<ChatParams>();
    const { dbUser, user, isAuthenticated } = useAuth0();
    const history = useHistory();

    useEffect(() => {

    }, [dbUser, user]);
    
    return (
        <Box background="neutral">
            <Box width="xlarge" margin={{ top: "75px", horizontal: "auto" }} style={{ maxHeight: "calc(100vh - 75px)"}}>
                <Box direction="row" pad="small" background="white" border={{ side: "bottom", color: "#eeeeee" }} justify="between">
                    <Box>
                        <Box direction="row" className={styles.btnOutline} onClick={() => history.goBack()}>
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
                            onClick={() => {}}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
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
        </Box>
    );
}