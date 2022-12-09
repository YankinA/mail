import { For } from 'solid-js';
import type { Folder } from './Sidebar.d';
import styles from './Sidebar.module.css';
import Button from './../shared/Button/Button';
import PenIcon from './../../assets/icons/pen.svg?component-solid';
import InboxIcon from './../../assets/icons/inbox.svg?component-solid';
import FolderIcon from './../../assets/icons/folder.svg?component-solid';
import SentIcon from './../../assets/icons/sent.svg?component-solid';
import DraftIcon from './../../assets/icons/draft.svg?component-solid';
import ArchiveIcon from './../../assets/icons/archive.svg?component-solid';
import SpamIcon from './../../assets/icons/spam.svg?component-solid';
import TrashIcon from './../../assets/icons/trash.svg?component-solid';

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
      classes={styles.WriteEmail + " " + styles.Button}
      mini
    />
  )
};

const Folders = () => {

  const folders: Folder[] = [
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
        {({ Icon, name }) => <li>
          <a>
            <Button 
             Icon={<Icon />} 
             name={name} 
             classes={styles.Button}
           />
          </a>
        </li>}
      </For>
    </ ul>)
};

export default Sidebar;
