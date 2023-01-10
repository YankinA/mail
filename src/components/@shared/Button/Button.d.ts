import type { Component, JSXElement, JSX } from 'solid-js';

type OnClick = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;

type ButtonComp = Component<{
	Icon?: JSXElement,
	name: string,
	nameFirst?: boolean,
	classes?: { [className: string]: boolean },
	children?: JSXElement,
	onClick?: OnClick
	active?: boolean,
	border?: boolean,
	mini?: boolean,
	big?: boolean,
	full?: boolean,
	hide?: boolean,
	miniHide?: boolean,
	hideIcon?: boolean,
}>;

type BtnContentComp = Component<{
	Icon?: JSXElement,
	name: string,
	nameFirst?: boolean,
}>;

