import { createContext, JSXElement, useContext } from "solid-js";
import initStore from "./initStore";
import type { Store } from './store.d';

const Context = createContext();

const store = initStore();

export function Provider(props: { children?: JSXElement }) {
  
  return (
    <Context.Provider value={store}>
      {props.children}
    </ Context.Provider>
  );
}

export function useStore(): Store { 

  return useContext(Context) as Store; 
};