import { createResource, createSignal } from "solid-js";
import routes from '../routes';
import type { Store } from './store.d';

const initStore = (): Store => {

  const [getTheme, setTheme] = createSignal<'white' | 'black'>('white');

  const [getFolder, setFolder] = createSignal<string>('Входящие');

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  const fetchMails = async (folder: string) => {
    return (await fetch(routes.getMails({ folder }))).json()
  };

  const [getMails] = createResource(getFolder, fetchMails);

  return {
    getTheme,
    setTheme,
    getFolder,
    setFolder,
    getDrawer,
    setDrawer,
    getMails,
  }
}
export default initStore;
