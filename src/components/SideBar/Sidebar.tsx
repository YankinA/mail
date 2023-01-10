import { For } from 'solid-js';
import type { Folder } from './Sidebar.d';
import styles from './Sidebar.module.css';
import Button from '../@shared/Button/Button';
import PenIcon from './../../assets/icons/pen.svg?component-solid';
import BurgerIcon from './../../assets/icons/burger.svg?component-solid';
import InboxIcon from './../../assets/icons/inbox.svg?component-solid';
import FolderIcon from './../../assets/icons/folder.svg?component-solid';
import SentIcon from './../../assets/icons/sent.svg?component-solid';
import DraftIcon from './../../assets/icons/draft.svg?component-solid';
import ArchiveIcon from './../../assets/icons/archive.svg?component-solid';
import SpamIcon from './../../assets/icons/spam.svg?component-solid';
import TrashIcon from './../../assets/icons/trash.svg?component-solid';
import PlusIcon from './../../assets/icons/plus.svg?component-solid';
import SettingsIcon from './../../assets/icons/settings.svg?component-solid';
import { useStore } from '../../store';

const Sidebar = () => {

  const { getDrawer } = useStore();
  return (
    <aside class={styles.Sidebar}
      classList={{ [styles.Sidebar_full]: getDrawer() }}>
      <WriteEmail />
      <Folders />
      <hr class={styles.Separator} />
      <NewFolder />
      <OpenSetting />
    </aside>
  );
};

const WriteEmail = () => {

  const { getLocale, getDrawer } = useStore();

  return (
    <div class={styles.WriteEmail}>
      <Button
        Icon={<PenIcon />}
        name={getLocale().sidebar.writeEmail}
        border
        full={getDrawer()}
        hideIcon
      />
    </div>
  )
};

const Folders = () => {

  const folders: Folder[] = [
    { Icon: BurgerIcon, name: 'hide' },
    { Icon: InboxIcon, name: 'inbox' },
    { Icon: FolderIcon, name: 'important' },
    { Icon: SentIcon, name: 'sent' },
    { Icon: DraftIcon, name: 'draft' },
    { Icon: ArchiveIcon, name: 'archive' },
    { Icon: SpamIcon, name: 'spam' },
    { Icon: TrashIcon, name: 'trash' },
  ];

  const { getLocale, getDrawer, setDrawer, setFolder, getFolder, setMail } = useStore();

  const toggleDrawer = () => { setDrawer(v => !v) }

  const folderOnClick = (name: string) => {
    if (name === 'hide') {
      toggleDrawer();
    } else {
      setMail(null);
      setFolder(name);

    }
  }

  return (
    <ul class={styles.Folders}>
      <For each={folders}>
        {(folder) => (
          <li classList={{ [styles.Burger]: folder.name === 'hide' }}>
            <a>
              <Button
                Icon={<folder.Icon />}
                name={getLocale().sidebar.folders[folder.name] ?? folder.name}
                onClick={() => { folderOnClick(folder.name) }}
                active={getFolder() === folder.name}
                full={getDrawer()}
              >
                {folder.name === 'inbox'
                  && <div class={styles.Counter}>11</div>}
              </ Button>
            </a>
          </li>
        )}
      </For>
    </ ul>)
};

const NewFolder = () => {
  const { getLocale, getDrawer } = useStore();
  return (
    <div class={styles.NewFolder}>
      <Button
        Icon={<PlusIcon />}
        name={getLocale().sidebar.newFolder}
        full={getDrawer()}
        miniHide={!getDrawer()}
      />
    </div>
  )
};

const OpenSetting = () => {

  const { getLocale, setSettings, getDrawer } = useStore();

  const onOpenSettings = () => {
    setSettings('open', true)
  };

  return (
    <div class={styles.OpenSetting}>
      <Button
        onClick={onOpenSettings}
        Icon={<SettingsIcon />}
        name={getLocale().sidebar.settings}
        full={getDrawer()}
      />
    </div>
  )
}

export default Sidebar;
