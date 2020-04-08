import React, { FC } from 'react';
import { Chat, Channel, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

interface ChatterProps {
    chatId: string;
    chatUser: ChatUser;
    chatUserToken: string;
}

interface ChatUser {
    id: string;
    name: string;
    image: string;
}

export const Chatter: FC<ChatterProps> = (props) => {
    const chatClient = new StreamChat('fg6kyxq6946m');

    chatClient.setUser(props.chatUser, props.chatUserToken);

    const channel = chatClient.channel('messaging', props.chatId, {
        // add as many custom fields as you'd like
        image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
        name: 'Talk about Go',
        
    });

    return (
        <>
            {props.chatUserToken &&
                <Chat client={chatClient} theme={"messaging light"}>
                    <Channel channel={channel}>
                        <Window >
                        <MessageList />
                        <MessageInput additionalTextareaProps={{}} />
                        </Window>
                        <Thread />
                    </Channel>
                </Chat>
            }
        </>
    )
}