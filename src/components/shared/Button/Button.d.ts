import type { Component, JSXElement } from 'solid-js';

type ButtonComp = Component<{
	Icon: JSXElement,
	name: string,
	classes?: string
}>;
