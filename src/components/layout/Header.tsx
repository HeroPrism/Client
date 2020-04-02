import React, { FC } from "react";
import { Box, ResponsiveContext, Menu } from "grommet";
import { useAuth0 } from "../../AuthenticationProvider";
import { FormDown } from "grommet-icons";
import * as assets from "../../assets";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
                        <Menu
                            style={{ zIndex: 10000000 }} 
                            plain
                            items={[
                                { label: "Log out", onClick: () => logout() }
                            ]}
                        >                                
                            <Box
                                style={{ zIndex: 10000000 }} 
                                direction="row"
                                gap="small"
                                pad="small"
                            >
                                <Box justify="center">Chris</Box>
                                <Box justify="center"><img width="40px" src={assets.Avatar1}></img></Box>
                                <Box justify="center"><FormDown /></Box>
                            </Box>
                      </Menu>
                    }
                </Box>
            </Box>
            
        </Box>
    );
}