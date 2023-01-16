import type { Component, JSX, JSXElement } from 'solid-js';

type Options = { [key: string]: string | JSXElement };

type SelectComp = Component<{
  options: { [key: string]: string | JSXElement },
  style?: JSX.CSSProperties | undefined,
  classes?: { [className: string]: boolean },
  children?: JSXElement,
}>;