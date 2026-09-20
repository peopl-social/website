import type { ModuleOptions } from "nuxt-i18n-micro";

interface ImportMeta {
  readonly dev: boolean;
}

declare module "@nuxt/schema" {
  interface NuxtConfig {
    i18n?: ModuleOptions;
  }
}
