import { ValidationResult } from "./ValidationResult";

export interface ValidationRule<TValue> {
    (key: string, value: TValue): ValidationResult<Maybe<TValue>>;
}
