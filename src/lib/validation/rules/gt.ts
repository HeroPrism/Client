import { ValidationRule } from "../ValidationRule";
import { FailureReason } from "../FailureReason";
import { pass, skip, fail } from "./utils";

export const gt = (x: number) => {
    const rule: ValidationRule<Maybe<number>> = (key, value) => {
        if (value == null) {
            return skip(key, value);
        } else if (value > x) {
            return pass(key, value);
        }

        return fail(key, value, FailureReason.Invalid);
    };

    return rule;
};
