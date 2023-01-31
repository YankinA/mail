import { createResource, createSignal } from "solid-js";
import routes from "../routes";
import { Mail, MailFilter, Mails } from "./store";

let errorCouter = 0;
let prevMails: Mail[] = [];
let prevFilter;

const fetchMails = async (filter: MailFilter): Promise<Mails> => {
  console.log('fetchMails');
  
  try {
    let mails: Promise<Mails> = (await fetch(routes.getMails(filter))).json();

    (await mails).result = [...prevMails, ...(await mails).result];
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