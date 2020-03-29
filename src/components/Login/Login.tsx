import React, { FC, useCallback, FormEvent, ChangeEvent } from 'react';
import { Layer, Box, Heading, Text, TextInput, Button } from 'grommet';
import * as assets from "../../assets";
import * as mask from "../../lib/masking";
import { Validator, FailureReason } from '../../lib/validation';
import { field, required, email, phone } from '../../lib/validation/rules';
import css from "./Login.module.scss";

interface LoginProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

const loginValidator = new Validator({
    email: field(required(), email()),
    password: field(required())
});

const signupValidator = new Validator({
    firstName: field(required()),
    lastName: field(required()),
    phone: field(required(), phone()),
    email: field(required(), email()),
    password: field(required())
});

const LOGIN_VALIDATION_MESSAGES = {
    email: {
        [FailureReason.Invalid]: "Please enter a valid email",
        [FailureReason.Required]: "An email address is required."
    },
    password: {
        [FailureReason.Required]: "A password is required."
    }
};

const SIGNUP_VALIDATION_MESSAGES = {
    firstName: {
        [FailureReason.Required]: "Please enter your first name."
    },
    lastName: {
        [FailureReason.Required]: "Please enter your last name."
    },
    phone: {
        [FailureReason.Invalid]: "Please enter a valid phone number",
        [FailureReason.Required]: "A phone number is required."
    },
    email: {
        [FailureReason.Invalid]: "Please enter a valid email",
        [FailureReason.Required]: "An email address is required."
    },
    password: {
        [FailureReason.Required]: "A password is required."
    }
};

export const Login: FC<LoginProps> = (props) => {
    const [ firstName, setFirstName ] = React.useState("");
    const [ lastName, setLastName ] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [ createAccount, setCreateAccount ] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState("");
    const [loginErrors, setLoginErrors] = React.useState(loginValidator.localize(LOGIN_VALIDATION_MESSAGES));
    const [signupErrors, setSignupErrors] = React.useState(signupValidator.localize(SIGNUP_VALIDATION_MESSAGES));

    const onFirstNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), []);
    const onLastNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), []);
    const onPhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPhone(mask.phone(e.target.value)), []);
    const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);

    const onLogin = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            const result = loginValidator.validate({ email, password });
            const errors = loginValidator.localize(LOGIN_VALIDATION_MESSAGES, result);

            if (result.valid) {
                
            }

            setLoginErrors(errors);
        },
        [email, password]
    );

    const onSignUp = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            const result = signupValidator.validate({ firstName, lastName, phone, email, password });
            const errors = signupValidator.localize(SIGNUP_VALIDATION_MESSAGES, result);

            if (result.valid) {
                
            }

            setSignupErrors(errors);
        },
        [firstName, lastName, phone, email, password]
    );

    const toggleLogin = () => {
        setCreateAccount(!createAccount);
    }

    return (
        <>
            {props.isOpen &&
                <Layer position="center" modal onClickOutside={() => props.setOpen(false)} onEsc={() => props.setOpen(false)}>
                    <Box flex direction="row" width="xlarge" background="neutral">
                        <Box alignSelf="center" fill align="center">
                            <Box width="medium">
                                <Heading textAlign="center" color="primary" level={3}>Get or give help to those in need in your community.</Heading>
                                {!createAccount &&
                                    <Box
                                        as="form"
                                        fill="vertical"
                                        overflow="auto"
                                        margin={{ top: "medium" }}
                                        onSubmit={onLogin}
                                    >
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                onChange={onEmailChange}
                                                placeholder="Email"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {loginErrors.email && <Text color="red">{loginErrors.email}</Text>}
                                        </Box>
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                type="password"
                                                onChange={onPasswordChange}
                                                placeholder="Password"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {loginErrors.password && <Text color="red">{loginErrors.password}</Text>}
                                        </Box>
                                        <Box flex={false} as="footer" align="center" margin={{ vertical: "medium" }}>
                                            <Button primary
                                                color="red"
                                                type="submit"
                                                className={css.btn}
                                            >
                                                Log in
                                            </Button>
                                        </Box>
                                        <Box align="center">
                                            <Text size="small">Don't have an account? <Text className={css.cursor} color="primary" size="small" onClick={toggleLogin}>Sign up</Text></Text> 
                                        </Box>
                                    </Box>
                                }
                                {createAccount &&
                                    <Box
                                        as="form"
                                        fill="vertical"
                                        overflow="auto"
                                        margin={{ top: "medium" }}
                                        onSubmit={onSignUp}
                                    >
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                onChange={onFirstNameChange}
                                                placeholder="First Name"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {signupErrors.firstName && <Text color="red">{signupErrors.firstName}</Text>}
                                        </Box>
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                onChange={onLastNameChange}
                                                placeholder="Last Name"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {signupErrors.lastName && <Text color="red">{signupErrors.lastName}</Text>}
                                        </Box>
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                placeholder="Phone"
                                                onChange={onPhoneChange}
                                                value={mask.phone(phone)}
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {signupErrors.phone && <Text color="red">{signupErrors.phone}</Text>}
                                        </Box>
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                onChange={onEmailChange}
                                                placeholder="Email"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {signupErrors.email && <Text color="red">{signupErrors.email}</Text>}
                                        </Box>
                                        <Box margin={{ bottom: "small" }}>
                                            <TextInput
                                                type="password"
                                                onChange={onPasswordChange}
                                                placeholder="Password"
                                                style={{ width: "100%" }}
                                            ></TextInput>
                                            {signupErrors.password && <Text color="red">{signupErrors.password}</Text>}
                                        </Box>
                                        <Box flex={false} as="footer" align="center" margin={{ vertical: "medium" }}>
                                            <Button primary
                                                color="red"
                                                type="submit"
                                                className={css.btn}
                                            >
                                                Sign up
                                            </Button>
                                        </Box>
                                        <Box align="center">
                                            <Text size="small">Already have an account? <Text className={css.cursor} color="primary" size="small" onClick={toggleLogin}>Log in</Text></Text> 
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        </Box>                     
                        <Box pad="xlarge" align="center" margin="none" fill background="primary">
                            <Box align="center">
                                <img width="80%" height="auto" src={assets.LoginHero} />
                                <Heading color="white" level={3} textAlign="center">Help those who need help</Heading>
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