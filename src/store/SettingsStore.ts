import { createStore } from "solid-js/store";
import { SettingsStore } from "./store";

export enum ColorThemes {
  Brown = 'brown',
  Gray = 'gray',
}

export enum FullThemes {
  Light = 'light',
  Classic = 'classic',
  Black = 'black',
  Anime = 'anime',
}


const init: SettingsStore = {
  theme: FullThemes.Light,
  colorThemes: ColorThemes,
  fullThemes: FullThemes,
  lang: 'ru',
  open: false,
  tab: 'appearance',
}

const [settings, setSettings] = createStore(init);

export { settings,  setSettings };