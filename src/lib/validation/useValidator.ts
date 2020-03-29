import { FieldRuleDictionary, FormValidator, MessageDictionary, Validator, Fields } from "./Validator";
import { useMemo, useState, useCallback } from "react";

interface ValidationRules<T> {
    fields: FieldRuleDictionary<T>;
    form?: FormValidator<T>[];
}

type ValidateAction<T> = (fields: Partial<T>) => boolean;
type ValidatorHook<T> = [Record<keyof T, string>, ValidateAction<T>];

export const useValidator = <T>(rules: ValidationRules<T>, messages?: MessageDictionary<T>): ValidatorHook<T> => {
    const m = messages || ({} as MessageDictionary<T>);
    const validator = useMemo(() => new Validator(rules.fields, rules.form), [rules]);
    const [errors, setErrors] = useState(() => validator.localize(m));

    const validate = useCallback(
        <U extends Fields>(fields: Partial<U>): boolean => {
            const result = validator.validate(fields as U);
            setErrors(validator.localize(m, result));

            return result.valid;
        },
        [setErrors, m]
    );

    return [errors, validate];
};
