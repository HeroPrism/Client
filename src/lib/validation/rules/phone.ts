import { ValidationRule } from "../ValidationRule";
import { FailureReason } from "../FailureReason";
import { pass, skip, fail } from "./utils";

const PHONE_MATCH = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

export const phone = () => {
    const rule: ValidationRule<Maybe<string>> = (key, value) => {
        if (value == null || value === "") {
            return skip(key, value);
        }

        let valid = PHONE_MATCH.test(value);

        if (valid) {
            return pass(key, value);
        }

        return fail(key, value, FailureReason.Invalid);
    };

    return rule;
};
