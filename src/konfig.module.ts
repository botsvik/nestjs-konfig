import { type DynamicModule, Module, Type } from "@nestjs/common";

import { buildKonfigs } from "./konfig.helpers";
import { KonfigStore } from "./konfig.store";

@Module({})
export class KonfigModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: KonfigModule,
      providers: [KonfigStore],
      exports: [KonfigStore],
    };
  }

  static forFeature(types: Type[]): DynamicModule {
    const { providers, exports } = buildKonfigs(types);

    return {
      module: KonfigModule,
      providers,
      exports,
    };
  }
}
