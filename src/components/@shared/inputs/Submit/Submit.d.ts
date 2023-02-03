import { Component } from "solid-js"

export type SubmitComp = Component<{
  name: string,
  classes?: {[key: string]: boolean}
}>;