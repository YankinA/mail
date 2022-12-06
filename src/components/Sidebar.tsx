import type { Component } from 'solid-js';
import styles from './Sidebar.module.css';
import InboxIcon from './../assets/icons/inbox.svg';


const Sidebar: Component = () => {
  const folders = [{ name: 'Входящие', Icon: InboxIcon }];
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
  <button class={styles['Sidebar-btn']}>
    Написать письмо
  </ button>
)};

interface Folder {
  name: string,
  Icon: string
}

const Folders: Component<{ folders: Folder[] }> = ({ folders }) => {
  return (
    <ul>
      {folders.map(({ name, Icon }) => <Folder name={name} Icon={Icon} />)}
    </ ul>
  )
};

const Folder: Component<Folder> = ({ name, Icon }) => {
  return (
  <li>
    <button class={styles['Sidebar-btn']} > 
      <Icon />
      {name} 
    </ button> 
  </li>
  )
}

export default Sidebar;
