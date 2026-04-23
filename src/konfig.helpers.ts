import { Type } from "@nestjs/common";

import { Env } from "./decorators/env.decorator";
import { Konfig } from "./decorators/konfig.decorator";
import { KonfigStore } from "./konfig.store";

const KONFIGS = Symbol.for("__KONFIGS__");

const defineEnvValues = (instance: object) => {
  const descriptors = Object.getOwnPropertyDescriptors(instance);
  for (const [property, descriptor] of Object.entries(descriptors)) {
    if (Env.hasMetadata(instance, property)) {
      const { key, parse } = Env.getMetadata(instance, property);
      const value = process.env[key];

      if (value !== undefined) {
        Object.defineProperty(instance, property, {
          value: parse ? parse(value) : value,
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
        });
      }
    }
  }
};

const defineGetters = (instance: object, store: KonfigStore) => {
  const descriptors = Object.getOwnPropertyDescriptors(instance);
  for (const [property, descriptor] of Object.entries(descriptors)) {
    if (Konfig.hasMetadata(instance, property)) {
      const defaultValue = descriptor.value;
      const keys = Konfig.getMetadata(instance, property);

      Object.defineProperty(instance, property, {
        get: () => store.find(keys, defaultValue),
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
      });
    }
  }
};

export const buildKonfigs = (types: Type[]) => {
  return {
    providers: [
      ...types,
      {
        provide: KONFIGS,
        inject: [KonfigStore, ...types],
        useFactory: (store: KonfigStore, ...instances: object[]) => {
          for (const instance of instances) {
            defineEnvValues(instance);
            defineGetters(instance, store);
          }

          return instances;
        },
      },
    ],
    exports: [...types],
  };
};
