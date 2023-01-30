import { createEffect, createSignal } from "solid-js";

const useScroll = (ref: HTMLElement) => {

  const [getScrollTop, setScrollTop] = createSignal(0);

  const onScroll = (e: Event) => {
    const target = e.target as Element;
    setScrollTop(target.scrollTop);
  };

  createEffect(() => {
    const scrollContainer = ref;

    setScrollTop(scrollContainer.scrollTop);
    scrollContainer.addEventListener('scroll', onScroll);
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  })
 
  return [getScrollTop, ref];
}