import { createStore } from "solid-js/store";
import { SettingsStore } from "./store";

export const colorThemes = [
  {
    header: '#291b18',
    bg: '#4e342e',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#242424',
    bg: '#424242',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#331d33',
    bg: '#5a355a',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#171928',
    bg: '#35385a',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#434c98',
    bg: '#646ecb',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#b31c4f',
    bg: '#e73672',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#b73026',
    bg: '#f44336',
    logo: '#ffffff',
    font: '#ffffff', 
  },
  {
    header: '#27662a',
    bg: '#388e3c',
    logo: '#ffffff',
    font: '#ffffff',
  },
  {
    header: '#3c928a',
    bg: '#81d8d0',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#837e78',
    bg: '#e2dcd5',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#8c847e',
    bg: '#ffebdc',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#747a63',
    bg: '#e7eed2',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#556f74',
    bg: '#d0f0f7',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#5a5e76',
    bg: '#c9d0fb',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#535f6b',
    bg: '#ddf3ff',
    logo: '#ffffff',
    font: '#333333',
  },
  {
    header: '#808080',
    bg: '#f0f0f0',
    logo: '#ffffff',
    font: '#333333',
  }
] as const;

const defaultTheme = colorThemes[0];

const init: SettingsStore = {
  theme: { ...defaultTheme },
  colorThemes: colorThemes,
  lang: 'ru',
  open: false,
  tab: 'appearance',
}

const [settings, setSettings] = createStore(init);

export { settings,  setSettings };