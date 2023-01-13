import { For, createSignal, Component } from 'solid-js';
import { useStore } from '../../store';
import styles from './Mails.module.css';
import CheckIcon from './../../assets/icons/check.svg?component-solid';
import BookmarkRedIcon from './../../assets/icons/bookmark_red.svg?component-solid';
import BookmarkGrayIcon from './../../assets/icons/bookmark_gray.svg?component-solid';
import ExclamationIcon from './../../assets/icons/exclamation.svg?component-solid';
import GovIcon from './../../assets/icons/categories/government.svg?component-solid';
import KeyIcon from './../../assets/icons/categories/key.svg?component-solid';
import MoneyIcon from './../../assets/icons/categories/money.svg?component-solid';
import PlaneIcon from './../../assets/icons/categories/plane.svg?component-solid';
import ShopIcon from './../../assets/icons/categories/shopping.svg?component-solid';
import TicketIcon from './../../assets/icons/categories/ticket.svg?component-solid';
import AttachIcon from './../../assets/icons/attach.svg?component-solid';
import type {
  AuthorComp, AvatarComp, BookmarkComp, MailDocsComp, MailTextComp, OnOpenMail, OnToggle, ReadCheckBoxComp,
} from './Mails.d';
import { getLocale } from '../../store/LocaleStore';

const Mails = () => {
  const { getMail, settings } = useStore();
  return (
    <section
      class={styles.Mails}>
      <div class={styles.screen}></div>
      {getMail() ? <Mail /> : <MailList />}
    </section>
  );
};

const Mail = () => {

  const { getMail } = useStore();
  const mail = getMail();
  return (
    <div class={styles.Mail}>
      <header class={styles.Mail_header}>
        <h1 class={styles.Mail_title}>
          {mail?.title}
        </h1>
        <Category category={mail?.flag} full />
      </ header>
      <MailAuthor />
      {mail?.doc?.img && <MailDocs doc={mail.doc} />}
      {mail?.text && <MailText text={mail?.text} />}
    </div>
  )
}

const MailAuthor = () => {
  const { getMail } = useStore();
  const mail = getMail();
  return (
    <section class={styles.MailAuthor}>
      <ReadCheckBox read={mail?.read ?? false} />
      <Avatar img={mail?.author?.avatar} label={mail?.author.name[0]} />
      <div style={styles.MailAuthor_desc}>
        <div class={styles.MailAuthor_desc_names}>
          <span class={styles.Mail_names}>
            <span>{mail?.author.name}</span>
            <span>{mail?.author.surname}</span>
          </span>
          <MailDate date={mail?.date} full />
          {mail?.important && <div class={styles.Mail_exclamation}>
            <ExclamationIcon />
          </ div>}
        </ div>
        <MailTo />
      </div>
    </section>
  )
};

const MailTo = () => {
  const { getMail } = useStore();
  const mail = getMail();

  const to = mail?.to.slice(0, 2);
  const sing = to?.length ? ', ' : '';
  const you = !mail?.folder ? `${getLocale().mail.you}${sing}` : '';
  const recipient = (num: number) => num > 1 ? 'получателей' : 'получатель';

  return (
    <div class={styles.MailTo}>{getLocale().mail.to}: {you}{to?.map(({ name, surname }, i) => (
      <span>
        {name} {surname}{i === to.length - 1 ? '' : ','}
      </span>
    ))}
      {mail?.to.length && mail.to.length > 2
        && ` еще ${mail.to.length - 2} ${recipient(mail.to.length - 2)}`}
    </ div>)
}

const MailDocs: MailDocsComp = ({ doc: { img } }) => {

  const { getLocale } = useStore();

  const docCounter = String(Array.isArray(img) ? img.length : 1);
  const lastNum = Number(docCounter[docCounter.length - 1]);

  let filesLocale = getLocale().mail.file[5];
  if (lastNum === 1) {
    filesLocale = getLocale().mail.file[1];
  } else if (lastNum > 1 && lastNum < 5) {
    filesLocale = getLocale().mail.file[2];
  }

  const getImgSize = (src: string) => {
    try {
      const base64str = src.substring(22);
      return Math.floor(atob(base64str).length / 1024);
    } catch (error) {
      return 0;
    }
  };

  const fullImgSize = Array.isArray(img)
    ? img.reduce((acc: number, src: string) => acc + getImgSize(src), 0)
    : getImgSize(img);

  return (
    <>
      <div class={styles.MailDocs}>
        {Array.isArray(img) ? img.map((src: string) => (
          <img class={styles.MailDocs_img} src={src} />
        )) : <img class={styles.MailDocs_img} src={img} />}
      </div>
      <span>{docCounter} {filesLocale} </span>
      <a class={styles.MailDocs_download}>{getLocale().mail.download} </a>
      <span class={styles.MailDocs_filesize}>({fullImgSize} {getLocale().mail.kb})</span>
    </>
  )
};

const MailText: MailTextComp = (props) => (
  <article class={styles.MailText}>
    <p>{props.text}</p>
  </article>
);

const MailList = () => {
  const { getMails, setMail, settings } = useStore();

  const onOpenMail: OnOpenMail = (mail, e) => {
    const target: HTMLElement = e.target as HTMLElement;

    const forbiddenTags = ['input', 'label', 'svg', 'path'];
    const forbiddenClasses = [styles.AuthorCheckBox_Icon];
    const hasTag = forbiddenTags.includes(target?.tagName.toLowerCase());

    const classList: string = target?.classList.value;
    const hasClass = forbiddenClasses.some(fClass => classList.includes(fClass));

    if (!hasTag && !hasClass) {
      setMail(mail);
    }
  }

  return <ul class={styles.MailLists}>
    <For each={getMails()?.result}>
      {(mail) => (
        <li
          class={styles.MailListItem}
          classList={{ [styles.MailListItem_theme]: settings.theme.id === 'full1' }}
          onClick={[onOpenMail, mail]}
        >
          <ReadCheckBox read={mail.read} />
          <Author author={mail.author} />
          <Bookmark bookmark={mail.bookmark} important={mail.important} />
          {mail.important && <div class={styles.exclamation}>
            <ExclamationIcon />
          </ div>}
          <MailContent
            title={mail.title}
            text={mail.text}
          />
          <div class={styles.wrap_widget}>
            <Category category={mail.flag} />
            {mail.doc && <Attach />}
            <MailDate date={mail.date} />
            {mail.doc && <></>}
          </div>
          <hr
            class={styles.MailListItem_hr}
            classList={{ [styles.MailListItem_hr_theme]: settings.theme.id === 'full1' }}
          />
        </ li>
      )}
    </For>
    <li class={styles.MailList_page_fixer} />
  </ul>
};

const ReadCheckBox: ReadCheckBoxComp = (props) => {

  const [getRead, setRead] = createSignal<boolean>(props.read);

  const onToggle: OnToggle = (e) => {
    const target = e.target as HTMLInputElement;
    setRead(target.checked);
  }

  return (
    <label
      class={styles.ReadCheckBox}
      classList={{ [styles.ReadCheckBox_active]: getRead() }}
    >
      <input type='checkbox' onClick={onToggle} checked={getRead()} />
    </label >
  )
};

const Author: AuthorComp = (props) => {
  return <div class={styles.Author}>
    <AuthorCheckBox />
    <Avatar img={props.author.avatar} label={props.author.name[0]} />
    <div class={styles.Author_names}>
      <span class={styles.Author_name}>
        {props.author.name}
      </span>
      <span class={styles.Author_surname}>
        {props.author.surname}
      </span>
    </div>
  </div>
}

const AuthorCheckBox = () => {

  const [getCheck, setCheck] = createSignal<boolean>(false);
  const { settings } = useStore();

  const onToggle: OnToggle = (e) => {
    const target = e.target as HTMLInputElement;
    setCheck(target.checked);

  }

  return (
    <div
      class={styles.AuthorCheckBox_wrapper}
      classList={{
        [styles.AuthorCheckBox_wrapper_show]: getCheck()
      }}
    >
      <label
        class={styles.AuthorCheckBox}
        classList={{
          [styles.AuthorCheckBox_active]: getCheck(),
          [styles.AuthorCheckBox_theme]: settings.theme.id === 'full1'
        }}
      >
        <div class={styles.AuthorCheckBox_Icon}>
          <CheckIcon />
        </ div>
        <input type='checkbox' onClick={onToggle} />
      </label >
    </div>)
};

const Avatar: AvatarComp = (props) => {
  return props.img
    ? <img
      class={styles.Avatar}
      src={props.img}
      alt="avatar"
    />
    : (
      <div class={styles.Avatar}>
        <div class={styles.Avatar_label}>
          {props.label}
        </div>
      </div>)
}

const Bookmark: BookmarkComp = (props) => {

  const [getCheck, setCheck] = createSignal<boolean>(props.bookmark);

  const onToggle: OnToggle = (e) => {
    const target = e.target as HTMLInputElement;
    setCheck(target.checked);
  }

  return (
    <label
      class={styles.Bookmark}
      classList={{
        [styles.Bookmark_active]: getCheck(),
        [styles.Bookmark_hide]: props.important
      }}
    >
      <div class={styles.Bookmark_Icon}>
        {getCheck() ? <BookmarkRedIcon /> : <BookmarkGrayIcon />}
      </ div>
      <input type='checkbox' onClick={onToggle} checked={getCheck()} />
    </label >)
};

const MailContent = (props) => (
  <article class={styles.MailContent}>
    <h3 class={styles.title} >{props.title}</h3>
    <p class={styles.text}>
      {props.text}
    </p>
  </article>)

const CategoryIcons = {
  registrations: <KeyIcon />,
  orders: <ShopIcon />,
  tickets: <TicketIcon />,
  trips: <PlaneIcon />,
  finesAndTaxes: <GovIcon />,
  finance: <MoneyIcon />,
}

type CategoryComp = Component<{ 
  category: keyof typeof CategoryIcons,
  full: boolean
}>;

const Category: CategoryComp = (props) => {

  const { getLocale } = useStore();
  return (
    <div class={styles.Category}>
      {props.category in CategoryIcons ? CategoryIcons[props.category] : null}
      {props.full && <span class={styles.Category_name}>{getLocale().mail.category[props.category]}</ span>}
    </div>
  );
};

const Attach = () => {
  const { settings } = useStore();
  return (
    <div class={styles.Attach} classList={{[styles.Attach_light]: settings.theme.id === 'full1'}}>
      <AttachIcon />
    </div>
  );
};

type MailDateComp = Component<{
  date: Date,
  full: boolean
}>;

const MailDate: MailDateComp = (props) => {

  const { settings, getLocale } = useStore();

  const today = new Date();
  const [day, mouth, year] = today.toLocaleDateString().split('.');
  const mailDate = new Date(props.date);

  const fullDate = mailDate.toLocaleDateString();
  const [mailDay, mailMouth, mailYear] = fullDate.split('.');
  const [hours, min, _] = mailDate.toLocaleTimeString().split(':');

  const isToday = day === mailDay && mouth === mailMouth && year === mailYear;

  const isThisYear = year === mailYear;

  const parsedToDDMMM = mailDate.toLocaleString(settings.lang, { day: "numeric", month: 'short' }).split(' ');

  const [formatedDay, mouthName] = settings.lang === 'ru' ? parsedToDDMMM : parsedToDDMMM.reverse();

  const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
  
  const formatedFullDate = mailDate.toLocaleDateString(settings.lang, options);
  
  const date = isThisYear ? `${formatedDay} ${mouthName.slice(0, 3)}` : formatedFullDate ;

  const formatedToday = `${props.full ? getLocale().mail.today + ', ' : ''}${hours}:${min}`;
  
  return (
    <div class={styles.Date}>
      {isToday ? formatedToday : date}
    </div>);
};

export default Mails;
