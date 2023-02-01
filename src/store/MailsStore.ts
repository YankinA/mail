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

let errorCouter = 0;
let prevMails: Mail[] = [];
let prevFilter: MailFilter;
const fetchMails = async (filter: MailFilter): Promise<Mails> => {
  console.log({filter});
  
   
  try {
    let mails: Promise<Mails> = (await fetch(routes.getMails(filter))).json();
    (await mails).offset = Number((await mails).offset);
    (await mails).limit = Number((await mails).limit);

    if (prevFilter && compareFilters(prevFilter, filter) && (await mails).offset > prevFilter?.offset) {
      (await mails).result = [...prevMails, ...(await mails).result]
    }
    

    prevMails = (await mails).result;
    prevFilter = filter;
    return mails;
  } catch (error) {
    console.log({ error });
    errorCouter++;
    if (errorCouter < 20) {
      return await fetchMails(filter);
    }
  };
};

const [getMailFilter, setMailFilter] = createSignal<MailFilter>({ folder: 'inbox' });

const [getMails] = createResource(getMailFilter, fetchMails);

const [getMail, setMail] = createSignal<Mail | null>(null);

export {
  getMailFilter,
  setMailFilter,
  getMails,
  getMail,
  setMail,
}; 