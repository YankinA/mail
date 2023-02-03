import { Component, JSXElement } from "solid-js"

type KeyboardEventType = KeyboardEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}
type InputEventType = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}
export type TextareaComp = Component<{
  value?: string
  placeholder?: string,
  spellcheck?: boolean,
  classes?: {[key: string]: boolean}
  onKeyPress?: (e: KeyboardEventType) => void,
  onChange?: (e: InputEventType) => void,
  children?: JSXElement,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  strike: boolean
}>;