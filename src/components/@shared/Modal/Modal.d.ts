import type { Component, JSX, JSXElement } from 'solid-js';

type OnClick = JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> | undefined;

type ModalComp = Component<{
  classes?: { [className: string]: boolean },
  children?: JSXElement,
  onClick?: OnClick
}>;

