



export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  payload: events
})



const initialState = {
  events: [
    { "name": "No Events found", "datetime": "123123", "coordinates": { "latitude": 12, "longitude": 32 } },
    
  ]
}
const eventReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_EVENTS':
      return {
        events: action.payload
      }
      break;
    default:
      return state;
  }
}
export default eventReducer