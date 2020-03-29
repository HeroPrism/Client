import { FailureReason } from "../FailureReason";
import { ValidationResult } from "../ValidationResult";

export const fail = <TValue>(key: string, value: TValue, reason: FailureReason): ValidationResult<TValue> => {
    return { key, value, reason, valid: false };
};

export const pass = <TValue>(key: string, value: TValue): ValidationResult<TValue> => {
    return { key, value, reason: FailureReason.None, valid: true };
};

export const skip = <TValue>(key: string, value: TValue): ValidationResult<TValue> => {
    return { key, value, reason: FailureReason.None, valid: true };
};
