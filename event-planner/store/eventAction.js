import { ADD_EVENT, DELETE_EVENT, DID_EVENT, SET_EVENTS } from "./eventTypes"
export const addEvent = (event) => ({
type: ADD_EVENT,
payload: event
})
export const deleteEvent = (id) => ({
type: DELETE_EVENT,
payload: id
})
export const didEvent = (id) => ({
type: DID_EVENT,
payload: id
})
export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events
})