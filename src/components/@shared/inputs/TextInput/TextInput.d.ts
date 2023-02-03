import { Component, JSXElement } from "solid-js"

type KeyboardEventType = KeyboardEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}
type InputEventType = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}
export type TextInputComp = Component<{
  name: string,
  value?: string,
  children?: JSXElement,
  onKeyPress?: (e: KeyboardEventType) => void,
  onChange?: (e: InputEventType) => void
}>;