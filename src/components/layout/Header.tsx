import React, { FC } from "react";
import { Box, ResponsiveContext } from "grommet";
import { useAuth0 } from "../../AuthenticationProvider";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Box width="100%" border={{ side: "bottom", color: "#eeeeee" }} style={{ position: "fixed", top: 0, zIndex: 1000 }}>
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
                        <Box onClick={() => logout()}>Logout</Box>
                    }
                </Box>
            </Box>
            
        </Box>
    );
}