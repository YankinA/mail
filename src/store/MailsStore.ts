import { createResource, createSignal } from "solid-js";
import routes from "../routes";
import { Mail, MailFilter, Mails } from "./store";

const compareFilters = (prev: MailFilter, cur: MailFilter) => {
  const prevKeys = Object.keys(prev).filter(key => key !== 'offset');
  const curKeys = Object.keys(cur).filter(key => key !== 'offset');

  if (prevKeys.length !== curKeys.length) {
    return false;
  }

  let key: keyof MailFilter;
  for (key in prev) {
    if (key === 'offset') {
      continue
    }

    if (prev[key] !== cur[key]) {
      return false;
    }
  }
  return true;
}

let mailsCache: Mail[] = [];
let prevFilter: MailFilter;
const fetchMails = async (filter: MailFilter): Promise<Mails> => {

  try {
    let mails: Promise<Mails> = (await fetch(routes.getMails(filter))).json();
    const { offset, limit } = await mails;
    (await mails).offset = Number(offset);
    (await mails).limit = Number(limit);

    const isEqualFilter = prevFilter && compareFilters(prevFilter, filter);
    const prevOffset = prevFilter?.offset ?? 0;
    const isValidOffset = ((await mails).offset > prevOffset)
      || (await mails).offset === prevOffset && !(await mails).result.length

    if (isEqualFilter && isValidOffset) {
      (await mails).result = [...mailsCache, ...(await mails).result]
    }

    mailsCache = (await mails).result;
    prevFilter = filter;
    return mails;
  } catch (error) {
    console.log({ error });
  };
};

const [getMailFilter, setMailFilter] = createSignal<MailFilter>({ folder: 'inbox' });

const [getMails] = createResource(getMailFilter, fetchMails);

const [getMail, setMail] = createSignal<Mail | null>(null);

const [getDraft, setDraft] = createSignal<Mail[] | []>([]);


const newMail: Mail = {
  to: [],
  title: '',
  text: '',
  bookmark: false,
  important: false,
  read: true,
  date: new Date(),
  folder: 'draft',
  author: {
    name: "Антон",
    surname: 'Я',
    email: 'my@mail.ru',
  }
};

const addMail = async (mail: Mail) => {

  const req = {
    url: routes.addMails(),
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(mail),
  };

  try {
    await fetch(routes.addMails(), req);

  } catch (error) {
    console.log(error);
  }
}

export {
  getMailFilter,
  setMailFilter,
  getMails,
  getMail,
  setMail,
  getDraft,
  setDraft,
  newMail,
  addMail,
}; 