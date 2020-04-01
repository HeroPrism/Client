import React, { FC, ClassicComponent } from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { useAuth0 } from '../../AuthenticationProvider';

interface ChatterProps {
    task?: TasksResponse;
}

export const Chatter: FC<ChatterProps> = (props) => {
    const { task } = props;
    const { getTokenSilently } = useAuth0();
    const chatClient = new StreamChat('fg6kyxq6946m');
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZ2VudGxlLXBvZXRyeS0yIn0.zt2_bpewg946GoxNaNFctrjN76D7ElehR0TKL68rBRU';
    
    chatClient.setUser({
        id: 'gentle-poetry-2',
        name: 'Gentle poetry',
        image: 'https://getstream.io/random_svg/?id=gentle-poetry-2&name=Gentle+poetry'
    }, userToken);

    const channel = chatClient.channel('messaging', task?.id, {
        name: task?.title,
    });

    return (
        <Chat client={chatClient} theme={'messaging light'}>
            <Channel channel={channel}>
                <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput additionalTextareaProps={{}} />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}