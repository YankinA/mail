import { Component, For } from 'solid-js';
import { useStore } from '../../store';
import styles from './Mails.module.css';

const letters = [
  {
    author: {
      name: 'Матанат',
      surname: 'Гаджикеримова',
      email: 'two-waysandstone@mail.ru'
    },
    to: [
      {
        name: 'Дирдь',
        surname: 'Ладухина',
        email: 'no-nonsensesnap@mail.ru',
        avatar: 'img'
      },
      {
        name: 'Балбика',
        surname: 'Макейченкова',
        email: 'alternativeexpulsion@mail.ru',
        avatar: 'img'
      }
    ],
    title: 'Первоначальный дуализм иллюзорен.',
    text: 'Диалектика индуцирует патристику. Имманентный предикат абстрактен. Интеллигибельная актуализация структуальна. Парадигма генетивна. Материализм контролирует космизм. Как ни странно, но необычайная парадигма, возводя, предполагает подтекст. Антагонизм иллюзорен. Актуализация упирается в народничество. Либидо примитивно. Органичная апперцепция, абстрагируясь, выводит дуализм. Откровенно сказать обскурантизм вполне возможен. Благо рефлектирует и заполняет апперцепцию — известный факт.',
    bookmark: false,
    important: false,
    read: false,
    folder: 'Архив',
    date: '2021-11-29T11:54:50.502Z',
    doc: { img: 'img' },
    category: "Деньги"
  }
];

const Mails: Component = () => {
  return (
    <section class={styles.Mails}>
      <MailList />
    </section>
  );
};

const MailList = () => {
  const { getMails }  = useStore();
  return <ul>
    <For each={letters}>
      {({ 
        author, bookmark, read, important, title, text, category, doc, date }) => (
        <li class={styles.MailList_item}>
          <ReadCheckBox read={read}/>
          <CheckBoxAuthor />
          <Author author={author}/>
          {bookmark && <></>}
          {(!bookmark && important) && <></>}
          <span>
            <span>{title}</span>
            <span>{"text"}</span>
          </span>
           <Category category={category} />
          <Date date={date}/>
          {doc && <></>}
        </ li>
      )}
    </For>
  </ul>
};

const ReadCheckBox = ({read}) => (
  <label 
    class={styles.Read_CheckBox}
    classList={{[styles.Read_CheckBox_active]: read }}
  >
    <input type='checkbox'/>
  </label>
);

const CheckBoxAuthor = () => <div></div>;

const Author = ({ author }) => {
  return <div>
    <Avatar img={author.avatar} />
    <span>{author.name}</span>
    <span>{author.surname}</span>
  </div>
}

const Avatar = ({ img }) => {
  return <>{img}</>
}
const Category = ({ category }) => {
  const categories = {
    "Деньги": "img",
  }
  return (
    <div>
      {categories[category]}
      {category}
    </div>
  );
};
const Date = ({ date }) => <div>{date}</div>

export default Mails;
