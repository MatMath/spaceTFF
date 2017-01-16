const calculatedData = (state={
  resultOfgrowth: [],
  savedBackup: []
}, action) => {
  // switch statement here
    switch (action.type) {
      case "FETCHED_SERVERGROWTH" : {
        return {...state, resultOfgrowth: action.payload};
      }
      default : {
        return {... state};
      }
    }
}
export default calculatedData;
