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

  const { drawer } = useStore();
  return (
    <aside class={styles.Sidebar}
     classList={{ [styles.Sidebar_full]: drawer.get() }}>
      <WriteEmail />
      <Folders />
      <hr class={styles.Separator} />
      <AddFolder />
    </aside>
  );
};

const WriteEmail = () => {

  const { drawer } = useStore();

  return (
    <div class={styles.WriteEmail}>
      <Button 
        Icon={<PenIcon />} 
        name="Написать письмо" 
        border
        full={drawer.get()}
        hideIcon={drawer.get()}
      />
    </div>
  )
};

const Folders = () => {

  const { drawer, folder: folderStore, mails } = useStore();

  const toggleDrawer = () => { drawer.set(v => !v) }

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

  return (
    <ul>
      <For each={folders}>
        {(folder) => (
          <li classList={{ [styles.Burger]: folder.name === 'Скрыть' }}>
            <a>
              <Button
                Icon={<folder.Icon />}
                name={folder.name}
                onClick={() => {
                  folderStore.set(folder.name);
                  if (folder.name === 'Скрыть') {
                    toggleDrawer();
                  }
                }}
                active={folderStore.get() === folder.name}
                full={drawer.get()}
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
  const { drawer } = useStore();
  return (
    <div class={styles.AddFolder}>
      <Button
        Icon={<PlusIcon />}
        name='Новая папка'
        light
        full={drawer.get()}
        miniHide={!drawer.get()}
      />
    </div>
  )
};

export default Sidebar;
