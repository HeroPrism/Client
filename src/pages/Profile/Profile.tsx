import React, { FC, useContext, useEffect, useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Box, ResponsiveContext, Heading, Text, TextInput, Button, Select, Grid } from 'grommet';
import { Edit } from 'grommet-icons';
import { useAuth0 } from '../../AuthenticationProvider';
import * as assets from "../../assets";
import styles from '../../styles.module.scss';
import { FailureReason, Validator } from '../../lib/validation';
import { field, required } from '../../lib/validation/rules';
import { Avatar } from '../../assets/Avatar';
import { useHistory } from 'react-router-dom';
import { RouteName, path } from '../../routing';

export const Profile: FC = () => {
    const size = useContext(ResponsiveContext);
    const { user, dbUser, completedRegistration, registerUser, updateProfile, isAuthenticated } = useAuth0();
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ editAvatar, setEditAvatar ] = useState<boolean>(false);
    const [ loadComplete, setLoadComplete ] = useState<boolean>(false);
    const history = useHistory();

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

    const [ firstName, setFirstName ] = React.useState(dbUser?.firstName || "");
    const [ userType, setUserType ] = React.useState(dbUser?.userType || "");
    const [ pictureId, setPictureId ] = React.useState(dbUser?.pictureId || 1);
    const [errors, setErrors] = React.useState(validator.localize(VALIDATION_MESSAGES));

    const onFirstNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), []);
    const onUserTypeChange = useCallback((e) => { setUserType(e.option) }, []);

    useEffect(() => {
        setFirstName(dbUser?.firstName || "")
        setUserType(dbUser?.userType || "")
        setPictureId(dbUser?.pictureId || 1)

        if ((dbUser?.firstName != "" && completedRegistration)) {
            setLoadComplete(true);
        }

    }, [dbUser?.firstName, dbUser?.userType, dbUser?.pictureId]);

    const editAvatarClick = (id: number) => {
        setPictureId(id);
        setEditAvatar(false);
    }

    const onSaveClick = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            const newUser = !completedRegistration;
            const result = validator.validate({ firstName, userType, pictureId });
            const errors = validator.localize(VALIDATION_MESSAGES, result);

            if (result.valid) {
                
                const user = {
                    firstName: firstName,
                    lastName: "NoLastName",
                    userType: userType,
                    pictureId: pictureId
                };

                registerUser(user);

                setEditMode(false);

                if (newUser) {
                    history.push(path(RouteName.Index));
                }
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
                            <Heading level={3} color="primary">
                                {!completedRegistration && isAuthenticated && loadComplete ? "Setup " : "" }
                                Your {editAvatar ? "Avatar" : "Profile"}</Heading>
                        </Box>
                        <Box>
                            {completedRegistration && !editMode &&
                                <Box onClick={() => setEditMode(true)}><Heading level={3}><Edit /></Heading></Box>
                            }
                        </Box>
                    </Box>
                    <Box border={{ side: "bottom", color: "tertiary" }}></Box>
                    {!editAvatar &&
                        <>
                            {isAuthenticated &&
                                <>
                                    {completedRegistration && !editMode &&
                                        <Box direction={ size == "small" ? "column" : "row" } margin={{ top: "large" }} gap={ size == "small" ? "large" : "small" } justify="between">
                                            <Box fill align={size == "small" ? "center" : "start" }>
                                                <img width="100px" src={Avatar(pictureId)}></img>
                                            </Box>
                                            <Box fill>
                                                <Box margin={{ bottom: "large" }}>
                                                    <Text weight="bold">Name</Text>
                                                </Box>
                                                <Box margin={{ bottom: "large" }}>
                                                    <Text>{firstName}</Text>
                                                </Box>
                                            </Box>
                                            <Box fill>
                                                <Box margin={{ bottom: "large" }}>
                                                    <Text weight="bold">Account Type</Text>
                                                </Box>
                                                <Box margin={{ bottom: "large" }}>
                                                    <Text>{userType}</Text>
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
                                                    <img width="100px" src={Avatar(pictureId)}></img>
                                                    <Box onClick={() => setEditAvatar(true)}>
                                                        <Text color="primary">Edit Avatar</Text>
                                                    </Box>
                                                </Box>
                                                <Box fill>
                                                    <Box margin={{ bottom: "large" }}>
                                                        <Text weight="bold">Name</Text>
                                                    </Box>
                                                    <Box margin={{ bottom: "large" }}>
                                                        <TextInput value={firstName} onChange={onFirstNameChange} />
                                                        {errors.firstName && <Text color="red">{errors.firstName}</Text>}
                                                    </Box>
                                                </Box>
                                                <Box fill>
                                                    <Box margin={{ bottom: "large" }}>
                                                        <Text weight="bold">Account Type</Text>
                                                    </Box>
                                                    <Box margin={{ bottom: "large" }}>
                                                    <Select
                                                        options={['Individual', 'Organization']}
                                                        value={userType}
                                                        onChange={onUserTypeChange}
                                                    />
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
                                                        {completedRegistration ? "Save" : "Finish Setup"}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                </>
                            }
                        </>
                    }
                    {editAvatar &&
                        <Box pad={{top: "large" }}>
                            <Grid
                                columns={{
                                    count: size == "small" ? 2 : 4,
                                    size: "auto"
                                }}
                                gap="large"
                            >
                                <Box align="center" onClick={() => editAvatarClick(1)}>
                                    <img width="115" src={assets.Avatar1} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(2)}>
                                    <img width="115" src={assets.Avatar2} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(3)}>
                                    <img width="115" src={assets.Avatar3} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(4)}>
                                    <img width="115" src={assets.Avatar4} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(5)}>
                                    <img width="115" src={assets.Avatar5} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(6)}>
                                    <img width="115" src={assets.Avatar6} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(7)}>
                                    <img width="115" src={assets.Avatar7} />
                                </Box>
                                <Box align="center" onClick={() => editAvatarClick(8)}>
                                    <img width="115" src={assets.Avatar8} />
                                </Box>
                            </Grid>
                            <Box margin={{ top: "large" }}>
                                <Button
                                    onClick={() => setEditAvatar(false)}
                                    className={styles.btnOutline}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
}