import { createSignal, onCleanup, onMount } from "solid-js";

export const useScroll = (ref: HTMLElement) => {

  const [getScrollTop, setScrollTop] = createSignal(0);

  const onScroll = (e: Event) => {
    const target = e.target as Element;
    setScrollTop(target.scrollTop);
  };

  onMount(() => {
    const scrollContainer = ref;

    setScrollTop(scrollContainer.scrollTop);
    scrollContainer.addEventListener('scroll', onScroll);
    onCleanup(() => scrollContainer.removeEventListener("scroll", onScroll));
  })



  return [getScrollTop, ref];
};