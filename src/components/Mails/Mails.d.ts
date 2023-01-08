import { Component, JSX } from "solid-js"

import type { Mail, Author } from './../../store/store.d';

type MailDocsComp = Component<{
  doc: {
    img: string | string[]
  }
}>

type MailTextComp = Component<{
  text: string
}>

type OnOpenMail = (mail: Mail, e: MouseEvent) => void;

type ReadCheckBoxComp = Component<{
  read: boolean;
}>;

type AuthorComp = Component<{ author: Author }>;

type OnToggle = JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>;

type AvatarComp = Component<{ img?: string, label?: string }>;


type BookmarkComp = Component<{
  bookmark: boolean;
  important?: boolean;
}>;



