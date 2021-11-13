import { ADD_EVENT, DELETE_EVENT, DID_EVENT, SET_EVENTS } from "./eventTypes";
const initialState = {
events: [
{ "name": "HTML I", "datetime": "123123", "coordinates": { "latitude": 12, "longitude": 32} },
{ "name": "HTML YOU", "datetime": "3232", "coordinates": { "latitude": 12, "longitude": 22} },

]
}
const eventReducer = (state = initialState, action) => {
switch (action.type) {
case ADD_EVENT:
return {
...state,
events: [...state.events, {
  event: action.payload, done: false, id: Math.random().toString()
}
]
}
case DELETE_EVENT:
return {
...state,
events: state.events.filter(item => item.id != action.payload)
}
case DID_EVENT:
return {
...state,
events: state.events.map((item) => {
if (item.id != action.payload) {
return item
}
return {
...item,
done: true
}
})
}
case SET_EVENTS:
  return {
    events: action.payload
  }
break;
default:
return state;
}
}
export default eventReducer