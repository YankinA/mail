import { createEffect, createResource, createSignal } from "solid-js";
import routes from '../routes';
import { settings, setSettings } from './SettingsStore';
import { getLocale, switchLocale } from "./LocaleStore";
import type { Store, Mail, Mails } from './store.d';


const initStore = (): Store => {

  const [getFolder, setFolder] = createSignal<string>('inbox');

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  const fetchMails = async (folder: string): Promise<Mails> => {
    try {
      return (await fetch(routes.getMails({ folder }))).json()
    } catch (error) {
      console.log({error});
      return await fetchMails(folder);
    };
  };

  const [getMails] = createResource(getFolder, fetchMails);

  const [getMail, setMail] = createSignal<Mail | null>(null);

  createEffect(() => { switchLocale(settings.lang); });

  return {
    getLocale,
    settings,
    setSettings,
    getFolder,
    setFolder,
    getDrawer,
    setDrawer,
    getMails,
    getMail,
    setMail
  }
}
export default initStore;
