import type { Component } from 'solid-js';
import styles from './Sidebar.module.css';
import Button from './shared/Button';
import InboxIcon from './../assets/icons/inbox.svg';
import FolderIcon from './../assets/icons/folder.svg';
import SentIcon from './../assets/icons/folder.svg';
import DraftIcon from './../assets/icons/draft.svg';
import ArchiveIcon from './../assets/icons/archive.svg';
import SpamIcon from './../assets/icons/spam.svg';
import TrashIcon from './../assets/icons/trash.svg';

const Sidebar: Component = () => {
  const folders = [
    { Icon: InboxIcon, name: 'Входящие' },
    { Icon: FolderIcon, name: 'Важное' },
    { Icon: SentIcon, name: 'Отправленные' },
    { Icon: DraftIcon, name: 'Черновики' },
    { Icon: ArchiveIcon, name: 'Архив' },
    { Icon: SpamIcon, name: 'Спам' },
    { Icon: TrashIcon, name: 'Корзина' },
  ];
  return (
    <aside class={styles.Sidebar}>
      <header>
        <WriteEmail />
      </header>
      <main>
        <Folders folders={folders} />
      </main>
      <footer></footer>
    </aside>
  );
};

const WriteEmail: Component = () => {
  return (
    <Button name="Написать письмо" />
  )
};


interface Folders {
  folders: Folder[]
}

const Folders: Component<Folders> = ({ folders }) => (
  <ul>
    {folders.map(({ Icon, name }) => <Folder Icon={Icon} name={name} />)}
  </ ul>);

interface Folder {
  name: string,
  Icon: string
}

const Folder: Component<Folder> = ({ Icon, name }) => (
  <li>
    <a>
    <Button Icon={<Icon/>} name={name}/>
    </a>
  </li>
);

export default Sidebar;
