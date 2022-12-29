import { writable } from "svelte/store"


function fromLS(key){
    let lstore = localStorage.getItem(key)
    if(lstore){
        return JSON.parse(lstore)
    }
}

export function createPersistedStore(key){
    const { subscribe, set, update } = writable(fromLS(key))

	return {
        get() {
            return fromLS(key)
        },
        subscribe,
        set: (payload) => {
              set(payload)
              localStorage.setItem(key, JSON.stringify(payload))
        },
        update: (payload) => update((store) => ({ ...store, ...payload })),
        clear(){
            this.set(undefined)
            localStorage.removeItem(key)
        }
    }
}


export const formStore = createPersistedStore('ft/form/store')