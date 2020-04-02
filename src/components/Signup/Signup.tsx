import React, { FC } from 'react';
import { Layer, Box, Heading, Text, Button } from 'grommet';
import * as assets from "../../assets";
import css from "./Signup.module.scss";
import { useAuth0 } from '../../AuthenticationProvider';

interface SignupProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export const Signup: FC<SignupProps> = (props) => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <>
            {props.isOpen &&
                <Layer position="center" modal onClickOutside={() => props.setOpen(false)} onEsc={() => props.setOpen(false)}>
                    <Box flex direction="row" width="xlarge" background="neutral">
                        <Box alignSelf="center" fill align="center">
                            <Box width="medium">
                                <Heading textAlign="center" color="primary" level={3}>Become a hero or ask a hero for help</Heading>
                                <Box flex={false} as="footer" align="center" margin={{ vertical: "medium" }}>
                                    <Button primary
                                        color="red"
                                        onClick={() => loginWithRedirect({ initialScreen: "signUp" })}
                                        className={css.btn}
                                    >
                                        Sign up
                                    </Button>
                                </Box>
                            </Box>
                        </Box>                     
                        <Box pad="xlarge" align="center" margin="none" fill background="primary">
                            <Box align="center">
                                <img width="80%" height="auto" src={assets.LoginHero} />
                                <Heading color="white" level={3} textAlign="center">Get help from your community</Heading>
                                <Text textAlign="center" color="white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Layer>
            }
        </>
    );
}