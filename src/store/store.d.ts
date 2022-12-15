import { Accessor, Resource, Setter } from "solid-js";

type Mails = {
  result: object[] | [],
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
}