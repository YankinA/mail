import type { Component, JSX, JSXElement, Setter } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

type Option = {
  Icon?: JSXElement,
  value: string,
  name: string | JSXElement,
  selected?: boolean,
};

type Options = { 
  [optionsValue: string]: Option 
};

type SelectComp = Component<{
  name: string, 
  options: Options,
  style?: JSX.CSSProperties | undefined,
  classes?: { [className: string]: boolean },
  children?: JSXElement,
  onSelect: (key: any) => void,
}>;

type SelecteddNamesComp = Component<{
  name: string,
  options: Options,
}>;

type OptionsComp = Component<{
  options: Options,
  onSelect: (key: any) => void,
  setOptions: SetStoreFunction<Options>,
}>;