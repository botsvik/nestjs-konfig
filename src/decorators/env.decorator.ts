const ENV_PROPERTY_METADATA = Symbol.for("__ENV_PROPERTY_METADATA__");

type EnvDecoratorMetadata = {
  key: string;
  parse?: (value: string) => unknown;
};

const setMetadata = (
  key: string,
  options: Omit<EnvDecoratorMetadata, "key"> = {},
): PropertyDecorator => {
  return Reflect.metadata(ENV_PROPERTY_METADATA, {
    key,
    ...options,
  });
};

const getMetadata = (
  target: object,
  propertyKey: string | symbol,
): EnvDecoratorMetadata => {
  return Reflect.getMetadata(target, propertyKey);
};

const hasMetadata = (target: object, propertyKey: string | symbol) => {
  return Reflect.hasMetadata(target, propertyKey);
};

export const Env = Object.assign(setMetadata, {
  getMetadata,
  hasMetadata,
});
