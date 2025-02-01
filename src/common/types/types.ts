export type BaseResponse<T = any> = {
    resultCode: number
    messages: string[],
    data: T
}