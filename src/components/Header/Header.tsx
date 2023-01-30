import styles from './Header.module.css';
import LogoIcon from './../../assets/icons/logo.svg';
import MailIcon from './../../assets/icons/mail.svg';
import BackIcon from './../../assets/icons/back.svg';
import { useStore } from '../../store';
import Select from '../@shared/Select/Select';
import BookmarkRedIcon from './../../assets/icons/bookmark_red.svg';
import AttachIcon from './../../assets/icons/attach.svg';
import type { Options } from '../@shared/Select/Select.d';


const Header = () => {

  const { getMail } = useStore();

  return (
    <header class={styles.Header}>
      {getMail() ? <Back /> : <><Logo /><Filter /></>}
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

  const updateFilter = (options: Options) => {

    if (options.all?.selected === true) {


      setFilter(prev => ({ folder: prev.folder }));
    } else {

      const filter: { [option: string]: true } = {};

      for (let option in options) {
        if (options[option].selected === true) {
          filter[option] = true;
        }
      }
      setFilter(prev => ({ ...filter, folder: prev.folder }));
    }
  }

  const locale = getLocale().header;

  const options: Options = {
    all: {
      name: locale.filters.all,
      value: 'all',
    },
    read: {
      name: locale.filters.read,
      value: 'read',
      Icon: Read,
    },
    bookmark: {
      name: locale.filters.bookmark,
      value: 'bookmark',
      Icon: BookmarkRedIcon,
    },
    doc: {
      name: locale.filters.doc,
      value: 'doc',
      Icon: AttachIcon,
    },
    cleane: {
      name: locale.filters.reset,
      value: 'reset',
    },
  };

  let selectCounter = 0;
  for (const key in getFilter()) {
    if (key in options) {
      options[key].selected = true;
      selectCounter++;
    }
  }

  options.all.selected = selectCounter > 0 ? true : false;

  return (
    <Select
      name={locale.filter}
      options={options}
      onSelect={updateFilter}
    />
  )
}

const Read = () => <div class={styles.Read} />

export default Header;