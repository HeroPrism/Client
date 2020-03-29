import { ValidationRule } from "../ValidationRule";
import { FailureReason } from "../FailureReason";
import { pass, fail } from "./utils";

export const required = <T>() => {
    const rule: ValidationRule<Maybe<T>> = (key, value) => {
        if (value == null || (value as any) == "") {
            return fail(key, value, FailureReason.Required);
        }

        return pass(key, value);
    };

    return rule;
};
