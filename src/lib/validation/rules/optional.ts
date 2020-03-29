import { ValidationRule } from "../ValidationRule";
import { pass, skip } from "./utils";

export const optional = <T = any>() => {
    const rule: ValidationRule<Maybe<T>> = (key, value) => {
        if (value == null || (value as any) == "") {
            return skip(key, value);
        }

        return pass(key, value);
    };

    return rule;
};
