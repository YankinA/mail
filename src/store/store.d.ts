import { Accessor, Resource, Setter } from "solid-js";


export type Author = {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}

export type To = {
  name: string;
  surname: string;
  email: string;
}

export type Doc = {
  img: string | string[];
}

export type Mail = {
  author: Author;
  to: To[];
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  date: Date;
  doc: Doc;
  flag: string;
  folder?: string;
}

export type Mails = {
  result: Mail[] | [],
  limit: number,
  offset: number
};

export type Store = {
  getTheme: Accessor<'white' | 'black'>,
  setTheme: Setter<'white' | 'black'>,
  getFolder: Accessor<string>,
  setFolder: Setter<string>,
  getDrawer: Accessor<boolean>,
  setDrawer: Setter<boolean>,
  getMails: Resource<Mails>,
  getMail: Accessor<Mail | null>,
  setMail: Setter<Mail | null>,
}