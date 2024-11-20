import { createContext, useCallback, useContext, useEffect } from "react";
import { ILocale } from "../models/locale/locale";
import {
  LocaleLanguageStorage,
  LocaleStorage,
  usePersistentStorage,
} from "../store/store";
import {
  formatString,
  getLocaleResources,
} from "../services/locale/i18nService";

export type LocaleKey = keyof ILocale | number | `${number}`;
export type LocalizeFn = (key: LocaleKey, ...args: any[]) => string;

const LocaleContext = createContext<LocalizeFn>(() => "");

const LocaleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [locales, setLocales] = usePersistentStorage(LocaleStorage);
  const [currentLocaleLang] = usePersistentStorage(LocaleLanguageStorage);

  const updateLocale = useCallback(async () => {
    const newLocale = await getLocaleResources(currentLocaleLang);
    if (newLocale) setLocales(newLocale);
  }, [currentLocaleLang]);

  const fallbackLocale = useCallback(async () => {
    const newLocale = await getLocaleResources();
    setLocales(newLocale ?? null);
  }, []);

  useEffect(() => {
    updateLocale().catch(fallbackLocale);
  }, [updateLocale]);

  const localize: LocalizeFn = (key: LocaleKey, ...args: string[]) => {
    if (key === undefined || key === null) return "";
    const trimmedKey = key.toString().replace(" ", "");
    if (trimmedKey === "") return "";

    key = trimmedKey as keyof ILocale;
    if (locales && locales[key]) return formatString(locales[key], ...args);

    if (!isNaN(trimmedKey as unknown as number)) {
      const keyAsArray = trimmedKey.split("");
      if (keyAsArray.length < 1) return "";
      else {
        return keyAsArray
          .map((char) => {
            const charKey = ("_" + char) as keyof ILocale;
            if (locales && locales[charKey])
              return formatString(locales[charKey], ...args);
            else return char;
          })
          .join("");
      }
    }

    const missingLocaleKey = `MissingLocale_${currentLocaleLang}`;
    const previousMissingLocaleString = localStorage.getItem(missingLocaleKey);

    const previousMissingLocales = previousMissingLocaleString
      ? JSON.parse(previousMissingLocaleString)
      : [];

    if (!previousMissingLocales.includes(key)) {
      previousMissingLocales.push(key);
      localStorage.setItem(
        missingLocaleKey,
        JSON.stringify(previousMissingLocales)
      );
    }
    return (key as string)?.replace(/([A-Z])/g, " $1");
  };

  return (
    <LocaleContext.Provider value={localize}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
export default LocaleContextProvider;
