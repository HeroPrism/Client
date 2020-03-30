import React, { FC, useState } from "react";
import { Box, ResponsiveContext, Layer, Heading, Text } from "grommet";
import * as assets from "../../assets";
import { Login } from "../Login/Login";
import { useAuth0 } from "../../AuthenticationProvider";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    const [ loginOpen, setLoginOpen ] = useState<boolean>(false);
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
                        <>
                            <Box onClick={() => setLoginOpen(true)}>Sign up</Box>
                            <Box onClick={() => loginWithRedirect({})}>Log in</Box>
                        </>
                    }
                    {isAuthenticated &&
                        <Box onClick={() => logout()}>Logout</Box>
                    }
                </Box>
            </Box>
            <Login isOpen={loginOpen} setOpen={setLoginOpen} />
        </Box>
    );
}