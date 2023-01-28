import { createStore } from "solid-js/store";
import { SettingsStore, Theme } from "./store";

export const colorThemes: Theme[] = [
  {
    type: 'color',
    id: 'color1',
    header: '#291b18',
    bg: '#4e342e',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color2',
    header: '#242424',
    bg: '#424242',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color3',
    header: '#331d33',
    bg: '#5a355a',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color4',
    header: '#171928',
    bg: '#35385a',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color5',
    header: '#434c98',
    bg: '#646ecb',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    id: 'color6',
    type: 'color',
    header: '#b31c4f',
    bg: '#e73672',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color7',
    header: '#b73026',
    bg: '#f44336',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color8',
    header: '#27662a',
    bg: '#388e3c',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color9',
    header: '#3c928a',
    bg: '#81d8d0',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color10',
    header: '#837e78',
    bg: '#e2dcd5',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color11',
    header: '#8c847e',
    bg: '#ffebdc',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    id: 'color12',
    type: 'color',
    header: '#747a63',
    bg: '#e7eed2',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color13',
    header: '#556f74',
    bg: '#d0f0f7',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color14',
    header: '#5a5e76',
    bg: '#c9d0fb',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color15',
    header: '#535f6b',
    bg: '#ddf3ff',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'color',
    id: 'color16',
    header: '#808080',
    bg: '#f0f0f0',
    logo: '#ffffff',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  }
];

export const fullThemes: Theme[] = [
  { 
    type: 'full',
    id: 'full1',
    name: 'Dark',
    header: '#232324',
    bg: '#19191A',
    logo: '#ffffff',
    font: '#E7E8EA',
    mailFont: '#ffffff',
    mutedFont: '#8C8E94',
    hover: 'rgba(255, 255, 255, 0.04)',
    active: 'rgba(255, 255, 255, 0.08)',
    mails: '#232324',
  },
  {
    type: 'full',
    id: 'full2',
    name: 'Light',
    header: '#ffffff',
    bg: '#F6F7F8',
    logo: '#005FF9',
    font: '#333333',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(0, 16, 61, 0.04)',
    active: 'rgba(0, 16, 61, 0.08)',
    mails: '#ffffff',
  },
  {
    type: 'full',
    id: 'full3',
    name: 'Anime',
    header: '#6B1344',
    bg: 'var(--theme-bg-amime)',
    bgMini: 'var(--theme-bg-amime-mini)',
    logo: '#ffffff',
    font: '#ffffff',
    mailFont: '#2C2D2E',
    mutedFont: '#87898F',
    hover: 'rgba(255, 255, 255, 0.16)',
    active: 'rgba(255, 255, 255, 0.24)',
    mails: '#ffffff',
  }
];

const localeTheme = localStorage.getItem('theme');
 
const defaultTheme = localeTheme ? JSON.parse(localeTheme) as Theme : { ...fullThemes[1]};

const defaultLang = localStorage.getItem("lang") as 'ru' | 'en' ?? 'ru';

const init: SettingsStore = {
  theme: defaultTheme,
  colorThemes: colorThemes,
  fullThemes: fullThemes,
  lang: defaultLang,
  open: false,
  tab: 'appearance',
}

const [settings, setSettings] = createStore(init);

const setTheme = (theme: Theme) => {
  setSettings('theme', theme);
  localStorage.setItem('theme', JSON.stringify(theme));
  document.documentElement.style.setProperty("--theme-bg", theme.bg);
  document.documentElement.style.setProperty("--theme-header-bg", theme.header);
  document.documentElement.style.setProperty("--theme-logo-mail-color", theme.logo);
  document.documentElement.style.setProperty("--theme-font", theme.font);
  document.documentElement.style.setProperty("--theme-mail-font", theme.mailFont);
  document.documentElement.style.setProperty("--theme-mutedFont", theme.mutedFont);
  document.documentElement.style.setProperty("--theme-btn-hover", theme.hover);
  document.documentElement.style.setProperty("--theme-btn-active", theme.active);
  document.documentElement.style.setProperty("--theme-mails-bg", theme.mails);

}

setTheme(defaultTheme);

export { settings, setSettings, setTheme };