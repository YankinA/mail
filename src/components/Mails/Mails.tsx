import { Component, For, createSignal } from 'solid-js';
import { useStore } from '../../store';
import styles from './Mails.module.css';

const Mails: Component = () => {
  return (
    <section class={styles.Mails}>
      <MailList />
    </section>
  );
};

const MailList = () => {
  const { getMails } = useStore();

  return <ul>
    <For each={getMails()?.result}>
      {(mail) => (
        <li class={styles.MailList_item}>
          <ReadCheckBox read={mail.read} />
          <CheckBoxAuthor />
          <Author author={mail.author} />
          {mail.bookmark && <></>}
          {(!mail.bookmark && mail.important) && <></>}
          <MailContetn title={mail.title} text={mail.text} />
          <Category category={mail.flag} />
          <Date date={mail.date} />
          {mail.doc && <></>}
        </ li>
      )}
    </For>
  </ul>
};

const ReadCheckBox = (props) => {

  const [getRead, setRead] = createSignal<boolean>(props.read);

  return (
    <label
      class={styles.Read_CheckBox}
      classList={{ [styles.Read_CheckBox_active]: getRead() }}
    >
      <input type='checkbox' onClick={() => {
        setRead(v => !v);
      }} />
    </label >
  )
};


const Author = (props) => {
  return <div class={styles.Author}>
    <Avatar img={props.author.avatar} />
    <span class={styles.Names}>
      <span>
        {props.author.name} {props.author.surname}
      </span>
    </span>
  </div>
}

const CheckBoxAuthor = () => <div></div>;

const Avatar = (props) => {
  return props.img ? <img class={styles.Avatar} src={props.img} alt="avatar" /> : <div class={styles.Avatar} />
}

const MailContetn = (props) => (<div>
  <span>{props.title}</span>
  <span>{"props.text"}</span>
</div>)

const Category = (props) => {
  const categories = {
    "Деньги": "img",
  }
  return (
    <div>
      {/* {categories[props.category]} */}
      {props.category}
    </div>
  );
};
const Date = (props) => <div>{props.date}</div>

export default Mails;
