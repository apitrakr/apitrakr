export interface CallbackModel {
    type: CallbackType;
}
export enum CallbackType {
    SUCCESS_CALLBACK,
    FAILURE_CALLBACK
};