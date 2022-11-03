// naming things is hard
import { createSignal, createContext, useContext, Accessor } from "solid-js";

type KeyStore = (Accessor<string[]> | { add(s: string): void; remove(s: string): void } | undefined)[]

const KeyContext = createContext<KeyStore>();

export const KeyProvider = (props: any) => {
  const [keys, setKey] = createSignal<string[]>(props.keys || 0),
    keyList: KeyStore = [keys,
      {
	add(s: string) {
	  setKey(k => [...k, s])
	  localStorage.api = JSON.stringify(keys)
	},
	remove(s: string) {
	  setKey(keys().filter((k) => {
	    return k !== s
	  }))
	  localStorage.api = JSON.stringify(keys)
	}
      }
    ];

  return (
    <KeyContext.Provider value={keyList}>
      {props.children}
    </KeyContext.Provider>
  );
}

export const useKey = () => useContext(KeyContext) 
