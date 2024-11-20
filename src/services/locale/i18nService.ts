import { ILocale } from "../../models/locale/locale";
import { TLocaleLang } from "../../store/store";
import { get } from "../api-service";

export async function getLocaleResources(lang?: TLocaleLang) {
  const path = lang ? `i18n/${lang}` : "i18n";
  const res = await get<ILocale>(path);
  return res && res.data;
}

export function formatString(value: string, ...args: string[]) {
  let formatted = value;
  for (let i = 0; i < args.length; i++) {
    let regexp = new RegExp("\\{" + i + "\\}", "gi");
    formatted = formatted.replace(regexp, args[i]);
  }
  return formatted;
}
