import styles from './Header.module.css';
import LogoIcon from './../../assets/icons/logo.svg';
import MailIcon from './../../assets/icons/mail.svg';
import BackIcon from './../../assets/icons/back.svg';
import { useStore } from '../../store';

const Header = () => {

  const { getMail } = useStore();

  return (
    <header class={styles.Header}>
      {getMail() ? <Back /> : <Logo />}
    </header>
  );
};

const Logo = () => {

  const { getDrawer } = useStore();
  return (
    <div class={styles.Logo}>
      <div class={styles.Logo_icon}>
        <LogoIcon />
      </ div>
      <span
        class={styles.Logo_Mail}
        classList={{ [styles.Logo_Mail_show]: getDrawer() }}
      >
        <MailIcon />
      </span>
    </div>
  );
};

const Back = () => {
  const { getLocale, setMail, getDrawer } = useStore();
  return (
    <button
      class={styles.Back}
      onClick={() => { setMail(null); }}>
      <BackIcon />
      <span
        class={styles.Back_text}
        classList={{ [styles.Back_text_show]: getDrawer() }}
      >
        {getLocale().mail.back}
      </span>
    </button>
  );
};

export default Header;