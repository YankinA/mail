import { useStore } from '../../store';
import Button from '../@shared/Button/Button';
import styles from './Settings.module.css';
import RuIcon from './../../assets/icons/flags/ru.svg?component-solid';
import EnIcon from './../../assets/icons/flags/en.svg?component-solid';
import CheckIcon from './../../assets/icons/check_big.svg?component-solid';
import LogoIcon from './../../assets/icons/logo.svg';
import MailIcon from './../../assets/icons/mail.svg';
import Radio from '../@shared/inputs/Radio/Radio';
import Submit from '../@shared/inputs/Submit/Submit';
import { createSignal, For, Match, Switch } from 'solid-js';
import type { LogoComp } from './Settings.d';

const Settings = () => {
  const { settings, setSettings } = useStore();

  const onClose = () => {
    setSettings('open', false);
  };

  return (
    <section
      class={styles.Settings}
      classList={{ [styles.Settings_open]: settings.open }}
    >
      <div class={styles.Settings_veil} onClick={onClose} />
      <main class={styles.Settings_main}>
        <SettingsSideBar />
        <SettingsContent />
      </main>
    </section>
  )
}

const SettingsSideBar = () => {
  return <aside class={styles.SettingsSideBar}>
    <ChooseAppearance />
    <ChooseLang />
  </aside>
}

const ChooseAppearance = () => {

  const { getLocale, settings, setSettings } = useStore();

  return (
    <Button
      active={settings.tab === 'appearance'}
      onClick={() => { setSettings('tab', 'appearance'); }}
      name={getLocale().settings.appearance}
      nameFirst
      big
      full
    />
  )
}

const langIcons = {
  'ru': <RuIcon />,
  'en': <EnIcon />
};

const ChooseLang = () => {

  const { getLocale, settings, setSettings } = useStore();

  return (
    <Button
      active={settings.tab === 'lang'}
      onClick={() => { setSettings('tab', 'lang'); }}
      name={getLocale().settings.lang + getLocale().settings[settings.lang]}
      Icon={langIcons[settings.lang]}
      nameFirst
      big
      full
    />)
};

const SettingsContent = () => {

  const { settings } = useStore();
  return <main class={styles.SettingsContent}>
    <Switch>
      <Match when={settings.tab === 'appearance'}>
        <AppearanceSettings />
      </ Match>
      <Match when={settings.tab === 'lang'}>
        <LangSettings />
      </ Match>
    </ Switch>
  </main>
}

const AppearanceSettings = () => {

  const { getLocale } = useStore();

  return (
    <form>
      <h5 class={styles.Settings_title}>
        {getLocale().settings.selectAppearance}
      </h5>
      <ColorThemes />
      <FullThemes />
    </form>
  )
}

const ColorThemes = () => {

  const { settings, setTheme } = useStore();

  return (
    <section class={styles.ColorThemes}>
      <For each={settings.colorThemes}>
        {(theme) => (
          <div
            onClick={() => { setTheme(theme); }}
            style={{ background: `${theme.bg}` }}
            class={styles.ColorTheme}
          >
            {theme.id === settings.theme.id ? <div class={styles.selected_theme}>
              <CheckIcon />
            </ div> : null}
          </ div>
        )}
      </For>
    </section>)
}

const FullThemes = () => {

  const { settings, setTheme } = useStore();

  return (
    <section class={styles.FullThemes}>
      <For each={settings.fullThemes}>
        {(theme) => (
          <div
          onClick={() => { setTheme(theme); }}
            style={{ background: theme?.bgMini ?? theme.bg,  }}
            class={styles.FullTheme}
          >
            {theme.id !== 'full3' && theme.logo && <Logo style={{ fill: theme.logo }}/>}
            {theme.id === settings.theme.id && <div class={styles.selected_theme}>
              <CheckIcon />
            </ div>}
          </ div>
        )}
      </For>
    </section>)
}

const Logo: LogoComp = ({ style }) => (
  <div style={style} class={styles.Logo}>
    <LogoIcon />
    <span class={styles.Logo_Mail}>
      <MailIcon />
    </span>
  </div>
);


const LangSettings = () => {

  const { getLocale, settings, setSettings } = useStore();
  const [getLang, setLang] = createSignal(settings.lang);

  const options = [
    { name: getLocale().settings.ru, value: 'ru', Icon: <RuIcon /> },
    { name: getLocale().settings.en, value: 'en', Icon: <EnIcon /> }
  ];

  const onSubmit = (e: Event) => {
    setSettings('lang', getLang());
    setSettings('open', false);
    e.preventDefault();
    window.location.reload();
  };


  return (
    <form onSubmit={onSubmit} >
      <h5 class={styles.Settings_title}>
        {getLocale().settings.selectLang}
      </h5>
      <Radio
        options={options}
        onChange={setLang}
        value={getLang()}
        name='langRadio'
      />
      <Submit name={getLocale().settings.switchLang} />
    </form>)
}

export default Settings;