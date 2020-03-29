import React, { FC, useState } from "react";
import { Box, ResponsiveContext, Layer, Heading, Text } from "grommet";
import * as assets from "../../assets";
import { Login } from "../Login/Login";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);
    const [ loginOpen, setLoginOpen ] = useState<boolean>(false);

    return (
        <Box width="100%" style={{ position: "fixed", top: 0, zIndex: 1000 }}>
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
                    <Box>Sign up</Box>
                    <Box onClick={() => setLoginOpen(true)}>Log in</Box>
                </Box>
            </Box>
            <Login isOpen={loginOpen} setOpen={setLoginOpen} />
        </Box>
    );
}