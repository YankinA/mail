import { createEffect, createResource, createSignal } from "solid-js";
import routes from '../routes';
import { settings, setSettings, setTheme } from './SettingsStore';
import { getLocale, switchLocale } from "./LocaleStore";
import type { Store, ModalStore } from './store.d';
import { 
  getMail, getMailFilter, getMails, addMail, setMail, setMailFilter, getDraft, setDraft, newMail,
} from "./MailsStore";


const initStore = (): Store => {

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  createEffect(() => { 
    switchLocale(settings.lang);
    localStorage.setItem("lang", settings.lang);
  });

  const [getModal, setModal] = createSignal<ModalStore>(null);

  return {
    getLocale,
    settings,
    setSettings,
    setTheme,
    getDrawer,
    setDrawer,
    getMails,
    addMail,
    getMail,
    setMail,
    getDraft, 
    setDraft,
    newMail,
    getMailFilter,
    setMailFilter,
    getModal,
    setModal,
  }
}
export default initStore;
