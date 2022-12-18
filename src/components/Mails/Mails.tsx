import { Component, For, createSignal } from 'solid-js';
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

const Mails: Component = () => {
  const { getMail } = useStore();
  return (
    <section class={styles.Mails}>
      {getMail() ? <Mail /> : <MailList />}
    </section>
  );
};

const Mail = (props) => {

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
      <ReadCheckBox read={mail?.read} />
      <Avatar img={mail?.author?.avatar} char={mail?.author.name[0]} />
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
  const you = !mail?.folder ? `Вы${sing}` : '';
  const recipient = (num: number) => num > 1 ? 'получателей' : 'получатель';

  return (
    <div class={styles.MailTo}>Кому: {you}{to?.map(({ name, surname }, i) => (
      <span>
        {name} {surname}{i === to.length - 1 ? '' : ','}
      </span>
    ))}
      {mail?.to.length && mail.to.length > 2
        && ` еще ${mail.to.length - 2} ${recipient(mail.to.length - 2)}`}
    </ div>)
}

const MailDocs = (props) => {

  const isArr = Array.isArray(props.doc.img);
  const files = (num: number) => {
    const lastNum = Number(String(num)[String(num).length - 1]);

    if (lastNum === 1) {
      return ' файл';
    } else if (lastNum > 1 && lastNum < 5) {
      return ' файла'
    } else {
      return ' файлов';
    }

  };

  const len = isArr ? props.doc.img.length : 1;

  const getSize = (src: string) => {
    try {
      const base64str = src.substring(22);
      return Math.floor(atob(base64str).length / 1024);
    } catch (error) {
      return 0;
    }

  }

  const fullSize = isArr
    ? props.doc.img.reduce((acc: number, src: string) => acc + getSize(src), 0)
    : getSize(props.doc.img);

  return (
    <>
      <div class={styles.MailDocs}>
        {isArr ? props.doc.img.map((src: string) => (
          <img class={styles.MailDocs_img} src={src} alt='вложенное изображение' />
        )) : <img class={styles.MailDocs_img} src={props.doc.img} alt='вложенное изображение' />}
      </div>
      <span>{len}{files(len)} </span>
      <a class={styles.MailDocs_download} >Скачать </a>
      <span class={styles.MailDocs_filesize}>({fullSize} кб)</span>
    </>
  )
};

const MailText = (props) => {
  return <article class={styles.MailText}>
    <p>{props.text}</p>
  </article>
}

const MailList = () => {
  const { getMails, setMail } = useStore();

  const onClick = (mail, e) => {
    const forbiddenTags = ['input', 'label', 'svg', 'path'];
    if (!forbiddenTags.includes(e.target.tagName.toLowerCase())) {
      setMail(mail);
    }

  }
  return <ul class={styles.MailLists}>
    <For each={getMails()?.result}>
      {(mail) => (
        <li
          class={styles.MailListItem}
          onClick={[onClick, mail]}
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
            less={mail.flag || mail.doc}
          />
          <div class={styles.wrap_widget}>
            <Category category={mail.flag} />
            {mail.doc && <Attach />}
            <MailDate date={mail.date} />
            {mail.doc && <></>}
          </div>
        </ li>
      )}
    </For>
  </ul>
};

const ReadCheckBox = (props) => {

  const [getRead, setRead] = createSignal<boolean>(props.read);

  return (
    <label
      class={styles.ReadCheckBox}
      classList={{ [styles.ReadCheckBox_active]: getRead() }}
    >
      <input type='checkbox' onClick={() => {
        setRead(v => !v);

      }} />
    </label >
  )
};


const Author = (props) => {
  return <div class={styles.Author}>
    <AuthorCheckBox />
    <Avatar img={props.author.avatar} char={props.author.name[0]} />
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

  const onClick = () => {
    setCheck(v => !v);

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
          [styles.AuthorCheckBox_active]: getCheck()
        }}
      >
        <div class={styles.AuthorCheckBox_Icon}>
          <CheckIcon />
        </ div>
        <input type='checkbox' onClick={[onClick]} />
      </label >
    </div>)
};

const Avatar = (props) => {
  return props.img
    ? <img
      class={styles.Avatar}
      src={props.img}
      alt="avatar"
    />
    : (
      <div class={styles.Avatar}>
        <div class={styles.Avatar_char}>
          {props.char}
        </div>
      </div>)
}

const Bookmark = (props) => {

  const [getCheck, setCheck] = createSignal<boolean>(props.bookmark);

  const onClick = () => {

    setCheck(v => !v);

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
      <input type='checkbox' onClick={[onClick]} />
    </label >)
};

const MailContent = (props) => (
  <article class={styles.MailContent}>
    <h3 class={styles.title} >{props.title}</h3>
    <p
      class={styles.text}
      classList={{ [styles.text_less]: props.less }}
    >
      {props.text}
    </p>
  </article>)

const CategoryIcons = {
  'Регистрации': <KeyIcon />,
  'Заказы': <ShopIcon />,
  'Билеты': <TicketIcon />,
  'Путешевствия': <PlaneIcon />,
  'Штрафы и налоги': <GovIcon />,
  'Финансы': <MoneyIcon />,
}

const Category = (props) => {
  return (
    <div class={styles.Category}>
      {props.category in CategoryIcons ? CategoryIcons[props.category] : null}
      {props.full && <span class={styles.Category_name}>{props.category}</ span>}
    </div>
  );
};

const Attach = () => {
  return (
    <div class={styles.Attach}>
      <AttachIcon />
    </div>
  );
};

const MailDate = (props) => {

  const today = new Date();
  const [day, mouth, year] = today.toLocaleDateString().split('.');
  const mailDate = new Date(props.date);

  const fullDate = mailDate.toLocaleDateString();
  const [mailDay, mailMouth, mailYear] = fullDate.split('.');
  const [hours, min, sec] = mailDate.toLocaleTimeString().split(':');

  const isToday = day === mailDay && mouth === mailMouth && year === mailYear;

  const isThisYear = year === mailYear;

  const [formatedDay, mouthName] = mailDate
    .toLocaleString('default', { day: "numeric", month: 'short' }).split(' ');

  const date = isThisYear
    ? `${formatedDay} ${mouthName.slice(0, 3)}` : mailDate.toLocaleDateString();

  const formatedToday = `${props.full ? 'Сегодня, ' : ''}${hours}:${min}`;
  return (
    <div class={styles.Date}>
      {isToday ? formatedToday : date}
    </div>);
};

export default Mails;
