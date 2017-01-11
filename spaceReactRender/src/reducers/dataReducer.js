const data = (state={
  resultOfgrowth: [],
  savedBackup: []
}, action) => {
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
export default data;
