import React, { FC, useReducer, useState, useEffect, useContext } from 'react';
import { Box, Layer, Heading, Text, Button, ResponsiveContext } from 'grommet';
import { Close, FormPreviousLink, MapLocation } from 'grommet-icons';
import { TaskList } from '../../components/Tasks/TaskList';
import { Map } from '../../components/Map/Map';
import css from './Home.module.scss';
import styles from '../../styles.module.scss';
import { useAuth0 } from '../../AuthenticationProvider';
import { TaskCreator } from '../../components/Tasks/TaskCreator';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { RouteName, path } from '../../routing';
import { TaskDetails } from '../../components/Tasks/TaskDetails';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { Signup } from '../../components/Signup/Signup';
import { AppContext } from '../../App';
import { TaskService } from '../../services/TaskService/TaskService';

export enum TaskView {
    Create,
    List,
    Details
}

export const Home: FC = () => {
    const taskService = new TaskService();
    const history = useHistory();
    const size = useContext(ResponsiveContext);
    const location = useLocation();
    const app = useContext(AppContext);
    const [ toggleMap, setToggleMap ] = useState<boolean>(false);
    const [ selectedTask, setSelectedTask ] = useState<TasksResponse>();
    const [ signupOpen, setSignupOpen ] = useState<boolean>(false);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    const [ showAskForHelp, setShowAskForHelp ] = useState<boolean>(false);
    const [ showTaskDetails, setShowTaskDetails ] = useState<boolean>(location.pathname.includes("help/"));

    const [ taskView, setTaskView ] = useState<TaskView>(TaskView.List);

    const onAskForHelp = () => {
        if (isAuthenticated) {
            setTaskView(TaskView.Create);
            setShowAskForHelp(!showAskForHelp);
        } else {
            setSignupOpen(true);
        }
    }

    const onHelpClick = () => {
        getTokenSilently().then(token => {
           taskService.offerHelp({ taskId: selectedTask?.id }, token).then(chat => {
               history.push(path(RouteName.Chat, { chatId: chat.chatId }));
           });
        });
    }

    const onAskForHelpCancel = () => {
        setTaskView(TaskView.List);
        setShowAskForHelp(false);
    }

    const onCloseTaskDetails = () => {
        setShowTaskDetails(false);
        setTaskView(TaskView.List);
    }

    const onOpenTaskDetails = (task: TasksResponse) => {
        setShowTaskDetails(true);
        setTaskView(TaskView.Details);
        setSelectedTask(task);
    }

    const renderNav = () => {
        switch(taskView) {
            case TaskView.List:
                return renderListNav();
            case TaskView.Details:
                return renderDetailsNav();
            case TaskView.Create:
                return renderCreateTaskNav();
        }
    }

    const renderListNav = () => {
        return (
            <Box direction="row" justify="between">
                <Box></Box>
                <Box direction="row">
                    {size == "small" &&
                        <Box direction="row" className={styles.btnOutline} onClick={() => setToggleMap(!toggleMap)}>
                            <Box>
                                <MapLocation />
                            </Box>
                        </Box>
                    }
                    <Box>
                        <Button primary
                            color="primary"
                            type="submit"
                            onClick={onAskForHelp}
                            className={styles.btn}
                        >
                            Ask for help
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }

    const renderDetailsNav = () => {
        return (
            <Box direction="row" justify="between">
                <Box>
                    <Box direction="row" className={styles.btnOutline} onClick={onCloseTaskDetails}>
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
                        color="primary"
                        onClick={onHelpClick}
                        className={styles.btn}
                    >
                        {"Offer help"}
                    </Button>
                </Box>
            </Box>
        );
    }

    const renderCreateTaskNav = () => {
        return (
            <Box direction="row" justify="between">
                <Box>
                    <Box direction="row" className={styles.btnOutline} onClick={onAskForHelpCancel}>
                        <Box>
                            <FormPreviousLink color="primary" />
                        </Box>
                        <Box>
                            {"Cancel"}
                        </Box>
                    </Box>
                </Box>
                <Box></Box>
            </Box>
        );
    }

    return (    
        <Box flex direction="row" className={css.appWrapper}>
            {(size != "small" || !toggleMap || taskView != TaskView.List) &&
                <Box width="large">
                    <Box background="white" border={{ side: "bottom", color: "#eeeeee" }}  pad="small">
                        {renderNav()}
                        <Signup isOpen={signupOpen} setOpen={setSignupOpen} />
                    </Box>
                    <Box pad={{ top: "small" }} className={css.sidebar}>
                        {showTaskDetails &&
                            <TaskDetails task={selectedTask} />
                        }
                        {!showTaskDetails &&
                            <>
                                {showAskForHelp &&
                                    <TaskCreator />
                                }
                                {!showAskForHelp &&
                                    <TaskList onSelect={onOpenTaskDetails} page={app.state.page} tasks={app.state.tasks} />
                                }
                            </>
                        }
                    </Box>     
                </Box>
            }
            
            {(size != "small" || toggleMap) && (taskView == TaskView.List || size != "small") &&
                <Box fill>
                    {(size == "small" && toggleMap) &&
                        <Box background="white" border={{ side: "bottom", color: "#eeeeee" }}  pad="small">
                            {renderNav()}
                            <Signup isOpen={signupOpen} setOpen={setSignupOpen} />
                        </Box>
                    }
                    <Map onSelect={onOpenTaskDetails} />
                </Box>
            }
        </Box>
    );
}