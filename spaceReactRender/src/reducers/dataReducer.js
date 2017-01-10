export default function reducer(state={
  resultOfgrowth: [],
  savedBackup: []
}, action) {
  // switch statement here
    switch (action.type) {
      case "SOMETHING" : {
        return {...state, resultOfgrowth:[]};
      }
      default : {
        return {... state};
      }
    }
}
