import type { Component, JSX } from "solid-js"
import ru from './../../locale/ru';

export type Folder = {
	Icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>,
	name: keyof typeof ru.sidebar.folders,
}
