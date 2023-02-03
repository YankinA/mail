import { Accessor, createSignal, onCleanup } from "solid-js";

type Scroll = {
  top: number,
  height: number,
  parentHeight: number,
};

type UseScroll = [
  (ref: HTMLElement) => void,
  Accessor<Scroll>,
];

export const useScroll = (): UseScroll => {

  const [getScroll, setScroll] = createSignal<Scroll>();

  const onScroll = (e: Event) => {
    const target = e.target as Element;
    setScroll({
      top: target.scrollTop,
      height: target.scrollHeight,
      parentHeight: target.clientHeight,
    });

  };

  const setRef = (ref: HTMLElement) => {
    setScroll({
      top: ref.scrollTop,
      height: ref.scrollHeight,
      parentHeight: ref.clientHeight,
    });
    ref.addEventListener('scroll', onScroll);
    onCleanup(() => {
      ref.removeEventListener("scroll", onScroll);
    });
  }

  return [setRef, getScroll];
};