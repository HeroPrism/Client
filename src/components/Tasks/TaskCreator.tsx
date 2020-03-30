import React, { useState, FC, useEffect, useRef, RefObject, useCallback, FormEvent, ChangeEvent } from 'react';
import { Box, TextInput, Button, Text, TextArea } from 'grommet';
import styles from '../../styles.module.scss';
import { Validator, FailureReason } from '../../lib/validation';
import { field, required } from '../../lib/validation/rules';



export const TaskCreator: FC = (props) => {
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

    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ zipCode, setZipCode ] = React.useState("");
    const [errors, setErrors] = React.useState(validator.localize(VALIDATION_MESSAGES));

    const onTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
    const onDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value), []);
    const onZipCodeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value), []);
    
    const onCreateTask = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            const result = validator.validate({ title, description, zipCode });
            const errors = validator.localize(VALIDATION_MESSAGES, result);

            if (result.valid) {
                
            }

            setErrors(errors);
        },
        [title, description, zipCode]
    );

    return (
        <Box pad="medium" animation={["fadeIn", "slideUp"]}>
             <Box
                as="form"
                fill="vertical"
                overflow="auto"
                margin={{ top: "medium" }}
                onSubmit={onCreateTask}
            >
                <Box margin={{ bottom: "small" }}>
                    <Text>Zipcode</Text>
                    <TextInput
                        onChange={onZipCodeChange}
                    ></TextInput>
                    {errors.zipCode && <Text color="red">{errors.zipCode}</Text>}
                </Box>
                <Box margin={{ bottom: "small" }}>
                    <Text>Title</Text>
                    <TextInput
                        onChange={onTitleChange}
                    ></TextInput>
                    {errors.title && <Text color="red">{errors.title}</Text>}
                </Box>
                <Box margin={{ bottom: "small" }}>
                    <Text>Description</Text>
                    <TextArea
                        onChange={onDescriptionChange}
                        style={{ minHeight: "300px" }}
                        resize={false}
                    />
                    {errors.description && <Text color="red">{errors.description}</Text>}
                </Box>
                <Box flex={false} as="footer" align="center" margin={{ vertical: "medium" }}>
                    <Button primary
                        color="red"
                        type="submit"
                        className={styles.btn}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}