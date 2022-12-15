import {createResource, createSignal  } from "solid-js";
import routes from '../routes';
import type { Store, Query } from './store.d';

const initStore = (): Store => {

  const [getTheme, setTheme] = createSignal<'white' | 'black'>('white');

  const [getFolder, setFolder] = createSignal<string>('Входящие');

  const [getDrawer, setDrawer] = createSignal<boolean>(false);

  const store = {
    theme: {
      get: getTheme,
      set: setTheme,
    },
    folder: {
      get: getFolder,
      set: setFolder
    },
    drawer: {
      get: getDrawer,
      set: setDrawer,
    },
    mails: {}
  };

  const fetchMails = async (folder: string) => {
    return (await fetch(routes.getMails({ folder }))).json()
  };

  const getQuery = (): Query => ({ folder: store.folder.get() });

  const [mails] = createResource(getFolder, fetchMails);
  store.mails = mails;
 
  return store;
}
export default initStore;
