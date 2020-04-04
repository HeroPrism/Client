import React, { FC } from "react";
import { Box, ResponsiveContext, Menu, Stack, Text } from "grommet";
import { Notification, Chat, ChatOption, MailOption } from "grommet-icons";
import { useAuth0 } from "../../AuthenticationProvider";
import { FormDown } from "grommet-icons";
import * as assets from "../../assets";
import { useHistory } from "react-router-dom";
import { path, RouteName } from "../../routing";
import { Avatar } from "../../assets/Avatar";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    const history = useHistory();
    
    const { isAuthenticated, loginWithRedirect, logout, dbUser } = useAuth0();

    const onProfileClick = () => {
        history.push(path(RouteName.Profile));
    }

    const onMessagesClick = () => {
        history.push(path(RouteName.Messages));
    }

    return (
        <Box width="100%" border={{ side: "bottom", color: "#eeeeee" }} style={{ position: "fixed", top: 0, zIndex: 1 }}>
            <Box
                gridArea="header"
                pad={{horizontal: "medium"}}
                height="75px"
                background="white"
                direction="row"
                align="center"
                justify="between"
            >
                <Box>
                    Helper Logo
                </Box>
                <Box direction="row" gap="medium">
                    {!isAuthenticated &&
                        <Box onClick={() => loginWithRedirect({})}>Log in</Box>
                    }
                    {isAuthenticated &&
                        <Box direction="row">
                            <Box onClick={onMessagesClick} justify="center" pad={{ top: "11px" }} margin={{ right: "small" }}>
                                <Stack anchor="top-right">
                                    <MailOption size="28px" />
                                    <Box
                                        background="red"
                                        align="center"
                                        pad={{ horizontal: '8px' }} margin={{top: "-10px", left: "-4px"}}
                                        round
                                    >
                                        <Text color="white" size="small">1</Text>
                                    </Box>
                                </Stack>
                            </Box>
                            
                            <Menu
                                style={{ zIndex: 10000000 }} 
                                plain
                                items={[
                                    { label: "Profile", onClick: onProfileClick },
                                    { label: "Log out", onClick: () => logout() }
                                ]}
                            >                                
                                <Box
                                    style={{ zIndex: 10000000 }} 
                                    direction="row"
                                    gap="small"
                                    pad="small"
                                >
                                    <Box justify="center">{dbUser?.firstName}</Box>
                                    <Box justify="center"><img width="40px" src={Avatar(dbUser?.pictureId || 1)}></img></Box>
                                    <Box justify="center"><FormDown /></Box>
                                </Box>
                        </Menu>
                      </Box>
                    }
                </Box>
            </Box>
            
        </Box>
    );
}