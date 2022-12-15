import { createSignal, For } from 'solid-js';
import type { Folder } from './Sidebar.d';
import styles from './Sidebar.module.css';
import Button from './../shared/Button/Button';
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
import { useStore } from '../../store';

const Sidebar = () => {

  const { getDrawer } = useStore();
  return (
    <aside class={styles.Sidebar}
      classList={{ [styles.Sidebar_full]: getDrawer() }}>
      <WriteEmail />
      <Folders />
      <hr class={styles.Separator} />
      <AddFolder />
    </aside>
  );
};

const WriteEmail = () => {

  const { getDrawer } = useStore();

  return (
    <div class={styles.WriteEmail}>
      <Button
        Icon={<PenIcon />}
        name="Написать письмо"
        border
        full={getDrawer()}
        hideIcon={getDrawer()}
      />
    </div>
  )
};

const Folders = () => {

  const folders: Folder[] = [
    { Icon: BurgerIcon, name: 'Скрыть' },
    { Icon: InboxIcon, name: 'Входящие' },
    { Icon: FolderIcon, name: 'Важное' },
    { Icon: SentIcon, name: 'Отправленные' },
    { Icon: DraftIcon, name: 'Черновики' },
    { Icon: ArchiveIcon, name: 'Архив' },
    { Icon: SpamIcon, name: 'Спам' },
    { Icon: TrashIcon, name: 'Корзина' },
  ];

  const { getDrawer, setDrawer, setFolder, getFolder, getMails } = useStore();

  const toggleDrawer = () => { setDrawer(v => !v) }

  const folderOnClick = (name: string) => {
    if (name === 'Скрыть') {
      toggleDrawer();
    } else {
      setFolder(name);
    }
  }

  return (
    <ul>
      <For each={folders}>
        {(folder) => (
          <li classList={{ [styles.Burger]: folder.name === 'Скрыть' }}>
            <a>
              <Button
                Icon={<folder.Icon />}
                name={folder.name}
                onClick={() => { folderOnClick(folder.name) }}
                active={getFolder() === folder.name}
                full={getDrawer()}
              >
                {folder.name === 'Входящие'
                  && <div class={styles.Counter}>11</div>}
              </ Button>
            </a>
          </li>
        )}
      </For>
    </ ul>)
};

const AddFolder = () => {
  const { getDrawer } = useStore();
  return (
    <div class={styles.AddFolder}>
      <Button
        Icon={<PlusIcon />}
        name='Новая папка'
        light
        full={getDrawer()}
        miniHide={!getDrawer()}
      />
    </div>
  )
};

export default Sidebar;
