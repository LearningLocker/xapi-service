interface JsonObject {
  // eslint-disable-next-line no-use-before-define
  readonly [key: string]: JsonValue;
}
export type JsonValue = number | string | boolean | null | JsonValue[] | JsonObject;
