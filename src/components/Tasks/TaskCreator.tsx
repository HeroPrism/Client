import React, { useState, FC, useEffect, useRef, RefObject, useCallback, FormEvent, ChangeEvent, useContext } from 'react';
import { Box, TextInput, Button, Text, TextArea, Heading, ResponsiveContext } from 'grommet';
import styles from '../../styles.module.scss';
import { Validator, FailureReason } from '../../lib/validation';
import { field, required } from '../../lib/validation/rules';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth0 } from '../../AuthenticationProvider';
import { useHistory } from 'react-router-dom';
import { RouteName, path } from '../../routing';

export const TaskCreator: FC = (props) => {
    const history = useHistory();
    const size = useContext(ResponsiveContext);
    const validator = new Validator({
        title: field(required()),
        description: field(required()),
        zipCode: field(required())
    });
    
    const VALIDATION_MESSAGES = {
        title: {
            [FailureReason.Required]: "A title is required."
        },
        description: {
            [FailureReason.Required]: "A description is required."
        },
        zipCode: {
            [FailureReason.Required]: "A zipcode is required."
        }
    };

    

    const taskService = new TaskService();
    const { getTokenSilently } = useAuth0();
    const [ taskCreated, setTaskCreated ] = useState<boolean>(false);
    const [ taskId, setTaskId ] = useState("");
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ zipCode, setZipCode ] = React.useState("");
    const [errors, setErrors] = React.useState(validator.localize(VALIDATION_MESSAGES));

    const onTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
    const onDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value), []);
    const onZipCodeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value), []);
    
    const onCreateTask = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            const result = validator.validate({ title, description, zipCode });
            const errors = validator.localize(VALIDATION_MESSAGES, result);

            if (result.valid) {
                taskService.createTask({
                    title: title,
                    description: description,
                    zipcode: zipCode
                }, await getTokenSilently()).then(result => {
                    setTaskId(result.id);
                    setTaskCreated(true);
                });
            }

            setErrors(errors);
        },
        [title, description, zipCode]
    );

    return (
        <Box pad={"medium"} animation={["fadeIn", "slideUp"]}>
            {!taskCreated &&
                <div>  
                    <Box background="neutral" pad="medium" border={{ side: "all", color: "red"}} round="xsmall">
                        <Text size="small">Slow the Spread of Coronavirus (COVID-19): Please practice social distancing while requesting help from our heroes. Please visit <a href="https://www.cdc.gov" target="_blank">www.cdc.gov</a> for recommended guidlines.</Text>
                    </Box>
                    <Box margin={{ top: size == "small" ? "large" : "medium", bottom: size == "small" ? "large" : "none"  }}>
                        <Text size="large" color="primary">Create a request for help</Text>
                    </Box>
                    <Box
                        as="form"
                        fill="vertical"
                        overflow="auto"
                        margin={{ top: "medium" }}
                        onSubmit={onCreateTask}
                    >
                        <Box margin={{ bottom: size == "small" ? "large" : "medium" }}>
                            <Box margin={{ bottom: "small" }}>
                                <Text>Zipcode</Text>
                            </Box>
                            <TextInput
                                onChange={onZipCodeChange}
                            ></TextInput>
                            {errors.zipCode && <Text color="red">{errors.zipCode}</Text>}
                            <Box margin={{ top: "xsmall" }}>
                                <Text color="#333333" size="small">We'll use an approximation to create a pin on the map.</Text>
                            </Box>
                        </Box>
                        <Box margin={{ bottom: size == "small" ? "large" : "medium" }}>
                            <Box margin={{ bottom: "small" }}>
                                <Text>Title</Text>
                            </Box>
                            <TextInput
                                onChange={onTitleChange}
                            ></TextInput>
                            {errors.title && <Text color="red">{errors.title}</Text>}
                            <Box margin={{ top: "xsmall" }}>
                                <Text color="#333333" size="small">Keep it short and to the point.</Text>
                            </Box>
                        </Box>
                        <Box margin={{ bottom: size == "small" ? "large" : "medium" }}>
                            <Box margin={{ bottom: "small" }}>
                                <Text>Description</Text>
                            </Box>
                            <TextArea
                                onChange={onDescriptionChange}
                                style={{ minHeight: "300px" }}
                                resize={false}
                            />
                            {errors.description && <Text color="red">{errors.description}</Text>}
                        </Box>
                        <Box flex={false} as="footer" align="end" margin={{ vertical: "medium" }}>
                            <Button primary
                                color="primary"
                                type="submit"
                                className={styles.btn}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </div>
            }
            {taskCreated &&
                <Box>
                    Task Created!
                </Box>
            }
        </Box>
    );
}