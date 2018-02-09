import Vue from 'vue'

const EventsBus = new Vue()

export function emitEvent (eventName, payload) {
  EventsBus.$emit(eventName, payload)
}

export function onEvent (eventName, callback) {
  EventsBus.$on(eventName, callback)
}

export const USER_LOGIN_SUCCESSFULLY = 'USER_LOGIN_SUCCESSFULLY'
export const USER_REGISTER_SUCCESSFULLY = 'USER_LOGIN_SUCCESSFULLY'
