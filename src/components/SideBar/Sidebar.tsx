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
import { createStore } from 'solid-js/store';

// const icons = import.meta.glob(
//   './../../assets/icons/*.svg',
//    { as: 'component-solid' }
// );

const Sidebar = () => {

  return (
    <aside class={styles.Sidebar}>
      <header>
        <WriteEmail />
      </header>
      <main>
        <Folders />
        <hr class={styles.Separator} />
        <AddFolder />
      </main>
      <footer></footer>
    </aside>
  );
};

const WriteEmail = () => {
  return (
    <Button
      Icon={<PenIcon />}
      name="Написать письмо"
      classes={{ [styles.WriteEmail]: true, [styles.Button]: true }}
    />
  )
};

const Folders = () => {

  const [
    curFolder, 
    setFolder,
  ] = createStore<{name: string}>({ name: 'Входящие' });

  const folders: Folder[] = [
    { Icon: BurgerIcon, name: 'Меню' },
    { Icon: InboxIcon, name: 'Входящие' },
    { Icon: FolderIcon, name: 'Важное' },
    { Icon: SentIcon, name: 'Отправленные' },
    { Icon: DraftIcon, name: 'Черновики' },
    { Icon: ArchiveIcon, name: 'Архив' },
    { Icon: SpamIcon, name: 'Спам' },
    { Icon: TrashIcon, name: 'Корзина' },
  ];

  const onClick = (name: string) => {
    setFolder({name});
  };

  return (
    <ul>
      <For each={folders}>
        {(folder) => (
          <li classList={{ [styles.Burger]: folder.name === 'Меню' }}>
            <a>
              <Button
                Icon={<folder.Icon />}
                name={folder.name}
                classes={{[styles.Button]: true }}
                onClick={() => onClick(folder.name)}
                active={curFolder.name === folder.name}
              >
                {folder.name === 'Входящие' && <div class={styles.Counter}>11</div>}
              </ Button>
            </a>
          </li>
        )}
      </For>
    </ ul>)
};

const AddFolder = () => (
  <div class={styles.AddFolder}>
    <Button
      Icon={<PlusIcon />}
      name='Новая папка'
    />
  </div>
);

export default Sidebar;
