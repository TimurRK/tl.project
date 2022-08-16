import { createI18n, useI18n } from "vue-i18n";

import { ru } from "@/locales/ru";

export const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "ru",
  useScope: "global",
  messages: {
    ru,
  },
});
