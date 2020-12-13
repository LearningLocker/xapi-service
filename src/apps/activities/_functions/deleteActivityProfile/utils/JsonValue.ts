interface JsonObject {
  readonly [key: string]: JsonValue;
}
export type JsonValue = number | string | boolean | null | JsonValue[] | JsonObject;
