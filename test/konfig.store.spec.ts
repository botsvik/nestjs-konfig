import { describe, expect, it } from "vitest";

import { KonfigStore } from "~konfig";

describe("KonfigStore#get", () => {
  it("Should return undefined when value is empty", () => {
    const store = new KonfigStore();
    const result = store.get("any.key");
    expect(result).toBeUndefined();
  });

  it("Should return correct value when store value contains key", () => {
    const store = new KonfigStore();
  });
});
