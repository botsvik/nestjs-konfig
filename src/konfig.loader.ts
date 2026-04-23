import { KonfigStore } from "./konfig.store";

export abstract class KonfigLoader {
  protected readonly update: (value: Record<string, unknown>) => void;

  constructor(private readonly store: KonfigStore) {
    // this.update = store.createUpdater();
  }

  public abstract load(): Promise<void>;
  public abstract reload(): Promise<void>;
}
