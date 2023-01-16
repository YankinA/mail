import styles from './Header.module.css';
import LogoIcon from './../../assets/icons/logo.svg';
import MailIcon from './../../assets/icons/mail.svg';
import BackIcon from './../../assets/icons/back.svg';
import { useStore } from '../../store';
import Select from '../@shared/Select/Select';
import BookmarkRedIcon from './../../assets/icons/bookmark_red.svg?component-solid';
import AttachIcon from './../../assets/icons/attach.svg?component-solid';


const Header = () => {

  const { getMail } = useStore();

  return (
    <header class={styles.Header}>
      {getMail() ? <Back /> : <Logo />}
      <Filter />
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

const Filter = () => {

  const { getLocale, getFilter, setFilter } = useStore();

  const {folder, ...selected } = getFilter();

  type SelectedOptions = typeof selected & { all?: boolean };

  const updateFilter = (selectedOptions: SelectedOptions) => {
    
    setFilter(prev => selectedOptions.all ? { folder: prev.folder } : {  ...prev, ...selectedOptions, folder: prev.folder })
  }

  const locale = getLocale().header;

  const options = {
    all: { name: locale.filters.all },
    read: { name: locale.filters.read, Icon: <Read /> },
    bookmark: { name: locale.filters.bookmark, Icon: <BookmarkRedIcon /> },
    doc: { name: locale.filters.doc, Icon: <AttachIcon /> },
  }
  return (
    <Select
      name={locale.filter} 
      options={options} 
      selected={getFilter()}
      onSelect={updateFilter}
    />
  )
}

const Read = () => <div class={styles.Read} />

export default Header;