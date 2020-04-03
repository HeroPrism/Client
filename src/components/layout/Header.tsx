import React, { FC } from "react";
import { Box, ResponsiveContext, Menu, Stack, Text } from "grommet";
import { Notification } from "grommet-icons";
import { useAuth0 } from "../../AuthenticationProvider";
import { FormDown } from "grommet-icons";
import * as assets from "../../assets";
import { useHistory } from "react-router-dom";
import { path, RouteName } from "../../routing";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    const history = useHistory();
    
    const { isAuthenticated, loginWithRedirect, logout, dbUser } = useAuth0();

    const onProfileClick = () => {
        history.push(path(RouteName.Profile));
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
                            <Box onClick={() => {}} justify="center" pad={{ top: "11px" }} margin={{ right: "small" }}>
                                <Stack anchor="top-right">
                                    <Notification size="28px" />
                                    <Box
                                        background="red"
                                        pad={{ horizontal: 'xsmall' }} margin={{top: "-8px"}}
                                        round
                                    >
                                        <Text color="white" size="small">8</Text>
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
                                    <Box justify="center"><img width="40px" src={assets.Avatar1}></img></Box>
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