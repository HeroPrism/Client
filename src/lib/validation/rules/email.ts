import { ValidationRule } from "../ValidationRule";
import { FailureReason } from "../FailureReason";
import { pass, skip, fail } from "./utils";

const EMAIL_MATCH = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const email = () => {
    const rule: ValidationRule<Maybe<string>> = (key, value) => {
        if (value == null || value === "") {
            return skip(key, value);
        }

        let valid = EMAIL_MATCH.test(value);

        if (valid) {
            return pass(key, value);
        }

        return fail(key, value, FailureReason.Invalid);
    };

    return rule;
};
