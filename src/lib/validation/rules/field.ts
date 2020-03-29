import { ValidationRule } from "../ValidationRule";
import { skip } from "./utils";

export const field = <TValue>(...rules: ValidationRule<TValue>[]) => {
    const rule: ValidationRule<TValue> = (key, value) => {
        let result;

        for (let i = 0; i < rules.length; i++) {
            result = rules[i](key, value);

            if (!result.valid) {
                break;
            }
        }

        return result || skip(key, value);
    };

    return rule;
};
