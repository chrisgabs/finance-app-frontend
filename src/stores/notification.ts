import { writable } from 'svelte/store'

type Notification = {
    message: string,
    status: boolean
}

let notif:Notification = {
    message: "transaction succesful", status: true
}

export const notifications = writable<Notification[]>([
    // { message: "transaction succesful", status: true },
    // { message: "unsuccessful transaction", status: false },
    // { message: "transaction succesful", status: true },
])

export function toast(message: string, status: boolean) {
  notifications.update((state) => [{message, status}, ...state])
  setTimeout(removeToast, 2500)
}

function removeToast() {
  notifications.update((state) => {
    return [...state.slice(0, state.length - 1)]
  })
}