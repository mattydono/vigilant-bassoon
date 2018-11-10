import { ActionCreatorsMapObject } from 'redux';

/**
 * Type Definitions for Action types
 */

export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
  error: boolean;
}

export interface ActionWithPayloadAndMeta<T extends string, P, M> extends ActionWithPayload<T, P> {
  meta: M;
}

/**
 * Type Definitions for Action Creators
 */

type ActionFn<T extends string> = () => Action<T>;

type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayload<T, P>;

type ActionWithPayloadAndMetaFn<T extends string, P, M> = (
  payload: P,
  meta: M,
) => ActionWithPayloadAndMeta<T, P, M>;

type createAction<
  Type extends string,
  Payload = undefined,
  Meta = undefined
> = Payload extends undefined
  ? ActionFn<Type>
  : Meta extends undefined
  ? ActionWithPayloadFn<Type, Payload>
  : ActionWithPayloadAndMetaFn<Type, Payload, Meta>;

export const createAction = <Payload = undefined, Meta = undefined>(
  type: string,
): createAction<typeof type, Payload, Meta> => {
  return ((payload?: any, meta?: any) => {
    const action: Action<any> = { type };

    if (payload !== undefined) {
      (action as ActionWithPayload<any, any>).payload = payload;
      (action as ActionWithPayload<any, any>).error = payload instanceof Error;
    }

    if (meta !== undefined) {
      (action as ActionWithPayloadAndMeta<any, any, any>).meta = meta;
    }

    return action;
  }) as createAction<typeof type, Payload, Meta>;
};

export type ActionUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
