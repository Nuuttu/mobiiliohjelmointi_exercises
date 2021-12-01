import { SET_EVENTS } from "./eventTypes"

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events
})