import { FailureReason } from "./FailureReason";

export interface ValidationResult<TValue> {
    key: string;
    value?: TValue;
    reason: FailureReason;
    valid: boolean;
}
