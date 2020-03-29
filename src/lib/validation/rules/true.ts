import { ValidationRule } from "../ValidationRule";
import { FailureReason } from "../FailureReason";
import { pass, skip, fail } from "./utils";

export const isTrue = () => {
    const rule: ValidationRule<boolean> = (key, value) => {
        if (value == null) {
            return skip(key, value);
        }

        if (value) {
            return pass(key, value);
        }

        return fail(key, value, FailureReason.Invalid);
    };

    return rule;
};
