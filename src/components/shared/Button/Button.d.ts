import type { Component, JSXElement, JSX } from 'solid-js';

type onClick = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;

type ButtonComp = Component<{
	Icon: JSXElement,
	name: string,
	classes?: { [className: string]: true },
	children?: JSXElement,
	onClick?: onClick
	active?: boolean
}>;

