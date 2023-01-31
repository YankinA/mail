import { Accessor, createSignal, onCleanup, onMount } from "solid-js";

type UseScroll = [Accessor<number>,(ref: HTMLElement) => void];
export const useScroll = (): UseScroll => {

  const [getScrollTop, setScrollTop] = createSignal(0);

  const onScroll = (e: Event) => {
    const target = e.target as Element;
    setScrollTop(target.scrollTop);
  };

  const setRef = (ref: HTMLElement) => {
    setScrollTop(ref.scrollTop);
    ref.addEventListener('scroll', onScroll);
    onCleanup(() => {
      ref.removeEventListener("scroll", onScroll);
    });
  }

  return [getScrollTop, setRef];
};