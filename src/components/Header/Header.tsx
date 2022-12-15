import type { Component } from 'solid-js';
import styles from './Header.module.css';
import LogoIcon from './../../assets/icons/logo.svg';
import MailIcon from './../../assets/icons/mail.svg';
import BackIcon from './../../assets/icons/back.svg';
import { useStore } from '../../store';

const Header: Component = (props) => {
  return (
    <header class={styles.Header}>
      <Logo />
    </header>
  );
};

const Logo: Component = () => {

  const { getDrawer } = useStore();
  return (
    <div class={styles.Logo}>
      <LogoIcon />
      <span
        class={styles.Logo_Mail}
        classList={{ [styles.Logo_Mail_show]: getDrawer() }}
      >
        <MailIcon />
      </span>
    </div>
  );
};

const Back: Component = () => {
  return (
    <button class={styles.Back}>
      <BackIcon />
      Вернуться
    </button>
  );
};

export default Header;