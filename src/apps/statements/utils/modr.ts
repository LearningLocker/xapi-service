export type Modifier = (data: any) => any;
export interface Schema { readonly [key: string]: Modifier; }

export const defaultValue = (value: () => any): Modifier => {
  return (data) => {
    return data === undefined ? value() : data;
  };
};

export const overrideValue = (value: any): Modifier => {
  return () => {
    return value;
  };
};

export const keepValue: Modifier = (data) => data;

export const modifyType = (type: any, modifier: Modifier): Modifier => {
  return (data) => {
    return (
      data !== undefined && data !== null && data.constructor === type ?
        modifier(data) :
        data
    );
  };
};

export const modifySchema = (schema: Schema) => {
  return modifyType(Object, (data) => {
    return Object.keys(schema).reduce((newData, key) => {
      const value = schema[key](data[key]);
      return {
        ...newData,
        ...(value === undefined ? {} : { [key]: value }),
      };
    }, data);
  });
};

export const modifyRestrictedSchema = (schema: Schema) => {
  return modifyType(Object, (data) => {
    return Object.keys(schema).reduce<typeof data>((newData, key) => {
      const value = schema[key](data[key]);
      return {
        ...newData,
        ...(value === undefined ? {} : { [key]: value }),
      };
    }, {});
  });
};

export const modifyCollection = (modifier: (index: number) => Modifier) => {
  return modifyType(Array, (data) => {
    return data.map((elem: any, index: number) => {
      return modifier(index)(elem);
    });
  });
};

export const composeModifiers = (modifiers: Modifier[]): Modifier => {
  return (data) => {
    return modifiers.reduce((result: any, modifier: Modifier) => {
      return modifier(result);
    }, data);
  };
};
