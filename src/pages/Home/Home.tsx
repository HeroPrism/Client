import React, { FC, useReducer, useState } from 'react';
import { Box, Layer, Heading, Text, Button } from 'grommet';
import { TaskList } from '../../components/Tasks/TaskList';
import { Map } from '../../components/Map/Map';
import css from './Home.module.scss';
import styles from '../../styles.module.scss';
import { useAuth0 } from '../../AuthenticationProvider';
import { TaskCreator } from '../../components/Tasks/TaskCreator';

export const Home: FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [ showAskForHelp, setShowAskForHelp ] = useState<boolean>(false);

    const onAskForHelp = () => {
        if (isAuthenticated) {
            setShowAskForHelp(!showAskForHelp);
        } else {
            loginWithRedirect();
        }
    }

    return (    
        <Box flex direction="row" className={css.appWrapper}>
            <Box width="large">
                <Box background="white" border={{ side: "bottom", color: "#eeeeee" }}  pad="small">
                    <Box alignSelf="end" width="30%" alignContent="between">
                        <Button primary
                            color="red"
                            type="submit"
                            onClick={onAskForHelp}
                            className={styles.btn}
                        >
                            {showAskForHelp ? "Cancel" : "Ask for help"}
                        </Button>
                    </Box>
                </Box>
                <Box pad={{ top: "small" }} className={css.sidebar}>
                    {showAskForHelp &&
                        <TaskCreator />
                    }
                    {!showAskForHelp &&
                        <TaskList page={1} />
                    }
                </Box>
                             
            </Box>
            <Box fill background="green">
                {/* <Map /> */}
            </Box>
        </Box>
    );
}