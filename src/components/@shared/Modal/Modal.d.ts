import type { Component, JSX, JSXElement } from 'solid-js';

type OnClick = JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> | undefined;

type ModalComp = Component<{
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void),
  style?: JSX.CSSProperties | undefined,
  classes?: { [className: string]: boolean },
  children?: JSXElement,
  onClick?: OnClick
}>;