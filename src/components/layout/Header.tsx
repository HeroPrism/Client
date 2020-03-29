import React, { FC, useState } from "react";
import { Box, ResponsiveContext, Layer, Heading, Text } from "grommet";
import * as assets from "../../assets";

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
            {loginOpen &&
                <Layer position="center" modal onClickOutside={() => setLoginOpen(false)} onEsc={() => setLoginOpen(false)}>
                    <Box flex direction="row" width="xlarge" background="neutral">
                        <Box alignSelf="center" fill align="center">
                            <Box width="medium">
                                <Heading textAlign="center" color="primary" level={3}>Get or give help to those in need in your community.</Heading>
                            </Box>
                        </Box>                     
                        <Box pad="xlarge" align="center" margin="none" fill background="primary">
                            <Box>
                                <img width="100%" height="auto" src={assets.LoginHero} />
                                <Heading color="white" level={3} textAlign="center">Help those who need help</Heading>
                                <Text textAlign="center" color="white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Layer>
            }
        </Box>
    );
}