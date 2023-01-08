import ru from './../locale/ru';
import en from './../locale/en';
import { createSignal } from "solid-js";

const locale = { ru, en };

const [getLocale, setLocale] = createSignal<typeof ru | typeof en>(ru);

const switchLocale = (lang: keyof typeof locale) => { 
  setLocale(locale[lang]); 
};

export { getLocale, switchLocale };