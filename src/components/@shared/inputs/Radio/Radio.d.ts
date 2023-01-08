import { Component, JSXElement, Setter } from "solid-js"

export type Option = {
  name: string,
  value: string,
  Icon: JSXElement,
}

export type RadioComp = Component<{
  options: Option[],
  value: string,
  name: string,
  onChange: Setter<string>,
}>;