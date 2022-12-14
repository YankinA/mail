import { Accessor, Resource, Setter } from "solid-js";

type Mails = {
    result: object[] | [],
    limit: number,
    offset: number
  };
  
  export type Store = {
    theme: {
      get: Accessor<"white" | "black">;
      set: Setter<"white" | "black">;
    };
    folder: {
      get: Accessor<string>;
      set: Setter<string>;
    };
    drawer: {
      get: Accessor<boolean>;
      set: Setter<boolean>;
    };
    mails: Resource<Mails> | {}
  }

  export type Query = {
    [key: string]: string
  }
  