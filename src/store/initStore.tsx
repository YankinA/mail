import { createEffect, createResource, createSignal } from "solid-js";
import routes from '../routes';
import { settings, setSettings, setTheme } from './SettingsStore';
import { getLocale, switchLocale } from "./LocaleStore";
import type { Store, Mail, Mails, AttachModalStore, Filter } from './store.d';


const initStore = (): Store => {

  const [getFolder, setFolder] = createSignal<string>('inbox');

  const [getFilter, setFilter] = createSignal<Filter>({folder: 'inbox'});

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  const fetchMails = async (filter: Filter): Promise<Mails> => {
    try {
      return (await fetch(routes.getMails(filter))).json()
    } catch (error) {
      console.log({error});
      return await fetchMails(filter);
    };
  };

  const [getMails] = createResource(getFilter, fetchMails);

  const [getMail, setMail] = createSignal<Mail | null>(null);

  createEffect(() => { 
    switchLocale(settings.lang);
    localStorage.setItem("lang", settings.lang);
  });

  const [getModal, setModal] = createSignal<AttachModalStore | null>(null);

  return {
    getLocale,
    settings,
    setSettings,
    setTheme,
    getFolder,
    setFolder,
    getDrawer,
    setDrawer,
    getMails,
    getMail,
    setMail,
    getModal,
    setModal,
    getFilter,
    setFilter
  }
}
export default initStore;
