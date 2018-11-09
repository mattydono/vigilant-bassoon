export type Action<Payload = any, Meta = any> = {
    type: string;
    payload: Payload;
    meta?: Meta;
    error?: Error;
}
