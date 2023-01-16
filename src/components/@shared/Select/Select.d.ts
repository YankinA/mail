import type { Component, JSX, JSXElement } from 'solid-js';

type Option = {
  Icon?: JSXElement,
  name: string | JSXElement
};

type SelectComp = Component<{
  name: string,
  options: { [name: string]: Option },
  selected: { [name: string]: boolean },
  style?: JSX.CSSProperties | undefined,
  classes?: { [className: string]: boolean },
  children?: JSXElement,
  onSelect: (key: any) => void
}>;

type OptionsComp = Component<{
  options: { [name: string]: Option },
  selected: { [name: string]: boolean },
  onSelect: (key: any) => void
}>;