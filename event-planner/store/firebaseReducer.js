
export const setFirebaseUrl = (url) => {
  return({
    type: 'SET_FIREBASE_URL',
    payload: url
  })
}

const initialState = {
  url: ``
}

const firebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIREBASE_URL':
      return {
        url: action.payload
      }
      break;
    default:
      return state;
  }
}
export default firebaseReducer