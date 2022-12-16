import type { Component, JSXElement, JSX } from 'solid-js';

type onClick = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;

type ButtonComp = Component<{
	Icon?: JSXElement,
	name: string,
	classes?: { [className: string]: boolean },
	children?: JSXElement,
	onClick?: onClick
	active?: boolean,
	border?: boolean,
	light?: boolean,
	mini?: boolean,
	full?: boolean,
	hide?: boolean,
	miniHide?: boolean,
	hideIcon?: boolean,
}>;

