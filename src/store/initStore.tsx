import { createResource, createSignal } from "solid-js";
import routes from '../routes';
import type { Store, Mail } from './store.d';

const initStore = (): Store => {

  const [getTheme, setTheme] = createSignal<'white' | 'black'>('white');

  const [getFolder, setFolder] = createSignal<string>('Входящие');

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  const fetchMails = async (folder: string) => {
    return (await fetch(routes.getMails({ folder }))).json()
  };

  const [getMails] = createResource(getFolder, fetchMails);

  const [getMail, setMail] = createSignal<Mail | null>(null);

  return {
    getTheme,
    setTheme,
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
