import { Component } from "solid-js"

type Option = string;

type InputEvent = KeyboardEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}

export type MultiSelectTextInputComp = Component<{
  name: string,
  options: Option[],
  onChange?: (e: InputEvent) => void,
  validOptions: (option: Option) => boolean
}>;

export type MultiSelectOptionsComp  = Component<{
  options: Option[],
  removeOption: (option: Option) => void,
  validOptions: (option: Option) => boolean
}>;