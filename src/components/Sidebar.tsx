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
      <div class={styles['Sidebar-btn-img']}>
      </div>
      <span>Написать письмо</span>
    </ button>
  )
};

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
      <a class={styles['Sidebar-btn']}>
        <div class={styles['Sidebar-btn-img']}><Icon /></div>
        <span>{name}</span>
      </ a>
    </li>
  )
}
interface SideBarBtn {
  Icon: string,
  name: string
};

const SideBarBtn: Component<SideBarBtn> = ({ Icon, name }) => (
  <a class={styles['Sidebar-btn']}>
    <div class={styles['Sidebar-btn-img']}><Icon /></div>
    <span>{name}</span>
  </ a>);

export default Sidebar;
