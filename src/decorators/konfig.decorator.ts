const KONFIG_PROPERTY_METADATA = Symbol.for("__KONFIG_PROPERTY_METADATA__");

const setMetadata = (...keys: string[]): PropertyDecorator => {
  return Reflect.metadata(KONFIG_PROPERTY_METADATA, keys);
};

const getMetadata = (
  target: object,
  propertyKey: string | symbol,
): string[] => {
  return Reflect.getMetadata(target, propertyKey);
};

const hasMetadata = (target: object, propertyKey: string | symbol) => {
  return Reflect.hasMetadata(target, propertyKey);
};

export const Konfig = Object.assign(setMetadata, {
  getMetadata,
  hasMetadata,
});
