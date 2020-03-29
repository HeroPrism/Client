import { ValidationRule } from "./ValidationRule";
import { ValidationResult } from "./ValidationResult";
import { FailureReason } from "./FailureReason";

export type Fields = Record<string, any>;

export type FieldRuleDictionary<T> = {
    [key in keyof T]-?: ValidationRule<T[key]>;
};

export type MessageDictionary<T> = {
    [key in keyof T]: {
        [key in FailureReason]?: string;
    };
};

export interface AggregateValidationResult<T> {
    data: any;
    valid: boolean;
    fields: {
        [key in keyof T]-?: ValidationResult<T[key]>;
    };
}

export interface FormValidator<T> {
    (result: AggregateValidationResult<T>): AggregateValidationResult<T>;
}

export class Validator<T extends Fields> {
    private readonly fields: FieldRuleDictionary<T>;
    private readonly validators: FormValidator<T>[];
    private readonly $keys: (keyof T)[];

    public constructor(fields: FieldRuleDictionary<T>, form: FormValidator<T>[] = []) {
        this.fields = fields;
        this.validators = form;
        this.$keys = Object.keys(fields);
    }

    public validate<U extends T>(data: Partial<U>): AggregateValidationResult<T> {
        const keys = this.$keys;
        const result = {
            data: data,
            valid: true,
            fields: Object.create(null)
        };

        for (let key of keys) {
            result.fields[key] = this.fields[key](key as string, data[key] as any);
            result.valid = result.valid && result.fields[key].valid;
        }

        const { fields } = this.validators.reduce((result, rule) => rule(result), result);

        return {
            data: data,
            fields: fields,
            valid: keys.reduce((valid, key: keyof T) => fields[key].valid && valid, true)
        };
    }

    public localize(messages: MessageDictionary<T>, result?: AggregateValidationResult<T>) {
        const keys = this.$keys;
        const fields = Object.create(null) as Record<keyof T, string>;

        for (let key of keys) {
            fields[key] = "";

            if (result != null) {
                const reason = result.fields[key].reason;

                if (messages[key] != null) {
                    fields[key] = messages[key][reason] || "";
                }
            }
        }

        return fields;
    }
}
