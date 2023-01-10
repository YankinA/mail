import { Accessor, Resource, Setter } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import ru from './../locale/ru';
import en from './../locale/en';
import { colorThemes, fullThemes } from "./SettingsStore";

export type SettingsStore = {
  theme: typeof colorThemes[number],
  colorThemes: typeof colorThemes,
  fullThemes: typeof fullThemes,
  lang: 'ru' | 'en',
  open: boolean,
  tab: 'appearance' | 'lang',
}

export type Author = {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}

export type To = {
  name: string;
  surname: string;
  email: string;
}

export type Doc = {
  img: string | string[];
}

export type Mail = {
  author: Author;
  to: To[];
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  date: Date;
  doc: Doc;
  flag: string;
  folder?: string;
}

export type Mails = {
  result: Mail[] | [],
  limit: number,
  offset: number
};

export type Store = {
  getLocale: Accessor<typeof ru | typeof en>,
  settings: SettingsStore,
  setSettings: SetStoreFunction<SettingsStore>,
  getFolder: Accessor<string>,
  setFolder: Setter<string>,
  getDrawer: Accessor<boolean>,
  setDrawer: Setter<boolean>,
  getMails: Resource<Mails>,
  getMail: Accessor<Mail | null>,
  setMail: Setter<Mail | null>,
}