import React, { FC, useContext, useEffect, useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Box, ResponsiveContext, Heading, Text, TextInput, Button } from 'grommet';
import { Edit } from 'grommet-icons';
import { useAuth0 } from '../../AuthenticationProvider';
import * as assets from "../../assets";
import styles from '../../styles.module.scss';
import { register } from '../../serviceWorker';
import { FailureReason, Validator } from '../../lib/validation';
import { field, required } from '../../lib/validation/rules';

export const Profile: FC = () => {
    const size = useContext(ResponsiveContext);
    const { user, dbUser, completedRegistration, registerUser, updateProfile } = useAuth0();
    const [ editMode, setEditMode ] = useState<boolean>(false);

    const validator = new Validator({
        firstName: field(required()),
        userType: field(required()),
        pictureId: field(required())
    });
    
    const VALIDATION_MESSAGES = {
        firstName: {
            [FailureReason.Required]: "A name is required."
        },
        userType: {
            [FailureReason.Required]: "An account type is required."
        },
        pictureId: {
            [FailureReason.Required]: "An avatar image is required."
        }
    };

    const [ firstName, setFirstName ] = React.useState("");
    const [ userType, setUserType ] = React.useState("Individual");
    const [ pictureId, setPictureId ] = React.useState(1);
    const [errors, setErrors] = React.useState(validator.localize(VALIDATION_MESSAGES));

    const onFirstNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), []);

    const onSaveClick = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            const result = validator.validate({ firstName, userType, pictureId });
            const errors = validator.localize(VALIDATION_MESSAGES, result);

            if (result.valid) {
                
                const user = {
                    firstName: firstName,
                    lastName: "Caruth",
                    userType: userType,
                    pictureId: pictureId
                };

                registerUser(user);

                setEditMode(false);
            }

            setErrors(errors);
        },
        [firstName, userType, pictureId]
    );

    return (    
        <Box flex direction="row" margin={{ top: "75px" }}>
            <Box background="neutral" style={{ width: "100%", minHeight: "calc(100vh - 75px)" }} pad="large">
                <Box width="xlarge" margin={{ horizontal: "auto"}} background="white" pad="large">
                    <Box direction="row" justify="between">
                        <Box>
                            <Heading level={3} color="primary">{!completedRegistration ? "Setup " : "" }Your Profile</Heading>
                        </Box>
                        <Box>
                            {completedRegistration && !editMode &&
                                <Box onClick={() => setEditMode(true)}><Heading level={3}><Edit /></Heading></Box>
                            }
                        </Box>
                    </Box>
                    <Box border={{ side: "bottom", color: "tertiary" }}></Box>
                    {completedRegistration && !editMode &&
                        <Box direction={ size == "small" ? "column" : "row" } margin={{ top: "large" }} gap={ size == "small" ? "large" : "small" } justify="between">
                            <Box fill align={size == "small" ? "center" : "start" }>
                                <img width="100px" src={assets.Avatar1}></img>
                            </Box>
                            <Box fill>
                                <Box margin={{ bottom: "large" }}>
                                    <Text weight="bold">Name</Text>
                                </Box>
                                <Box margin={{ bottom: "large" }}>
                                    <Text>{dbUser?.firstName}</Text>
                                </Box>
                            </Box>
                            <Box fill>
                                <Box margin={{ bottom: "large" }}>
                                    <Text weight="bold">Account Type</Text>
                                </Box>
                                <Box margin={{ bottom: "large" }}>
                                    <Text>Individual</Text>
                                </Box>
                            </Box>
                            <Box fill>
                                <Box margin={{ bottom: "large" }}>
                                    <Text weight="bold">Email</Text>
                                </Box>
                                <Box margin={{ bottom: "large" }}>
                                    <Text>{user?.email}</Text>
                                    <Text size="xsmall" color="secondary">Verified: {user?.email_verified ? "Yes" : "No" }</Text>
                                </Box>
                            </Box>
                        </Box>
                    }
                    {(!completedRegistration || editMode) &&
                        <Box as="form" onSubmit={onSaveClick}>
                            <Box
                                direction={ size == "small" ? "column" : "row" } 
                                margin={{ vertical: "large" }} 
                                gap={ size == "small" ? "large" : "small" } 
                                justify="between"
                             >
                                <Box fill align={size == "small" ? "center" : "start" }>
                                    <img width="100px" src={assets.Avatar1}></img>
                                </Box>
                                <Box fill>
                                    <Box margin={{ bottom: "large" }}>
                                        <Text weight="bold">Name</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <TextInput value={dbUser?.firstName} onChange={onFirstNameChange} />
                                        {errors.firstName && <Text color="red">{errors.firstName}</Text>}
                                    </Box>
                                </Box>
                                <Box fill>
                                    <Box margin={{ bottom: "large" }}>
                                        <Text weight="bold">Account Type</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Text>Individual</Text>
                                        {errors.userType && <Text color="red">{errors.userType}</Text>}
                                    </Box>
                                </Box>
                                <Box fill>
                                    <Box margin={{ bottom: "large" }}>
                                        <Text weight="bold">Email</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Text>{user?.email}</Text>
                                        <Text size="xsmall" color="secondary">Verified: {user?.email_verified ? "Yes" : "No" }</Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Box direction="row" justify="center">
                                {editMode && completedRegistration &&
                                    <Box>
                                        <Button
                                            onClick={() => setEditMode(false)}
                                            className={styles.btnOutline}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                }
                                <Box>
                                    <Button primary
                                        color="primary"
                                        type="submit"
                                        className={styles.btn}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
}