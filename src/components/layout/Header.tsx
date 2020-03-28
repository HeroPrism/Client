import React, { FC } from "react";
import { Box, ResponsiveContext } from "grommet";

export const Header : FC = () => {
    const size = React.useContext(ResponsiveContext);

    return (
        <Box width="100%" style={{ position: "fixed", top: 0, zIndex: 1000 }}>
            <Box
                gridArea="header"
                pad="small"
                height="75px"
                background="white"
                direction="row"
                align="center"
                justify="between"
            >
                <Box>
                    Helper Logo
                </Box>
                <Box>
                    About us
                </Box>
            </Box>
        </Box>
    );
}