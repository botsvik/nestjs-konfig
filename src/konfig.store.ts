import { AsyncLocalStorage } from "node:async_hooks";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KonfigStore {
  private readonly asl = new AsyncLocalStorage<Record<string, unknown>>();
  private readonly value: Record<string, unknown> = {};
  private readonly values: Record<string, unknown>[] = [];

  private store() {
    return this.asl.getStore() ?? this.value;
  }

  has(key: string) {
    return key in this.store();
  }

  get(key: string, defaultValue?: unknown) {
    const store = this.store();
    return key in store ? store[key] : defaultValue;
  }

  find(keys: string[], defaultValue?: unknown) {
    const store = this.store();

    for (const key of keys) {
      if (key in store) {
        return store[key];
      }
    }

    return defaultValue;
  }
}
