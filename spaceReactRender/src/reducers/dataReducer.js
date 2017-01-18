const calculatedData = (state={
  resultOfgrowth: [],
  savedBackup: []
}, action) => {
  // switch statement here
    switch (action.type) {
      case "FETCHED_SERVERGROWTH" : {
        return {...state, resultOfgrowth: [...action.payload]};
      }
      case "BACKUP_GROWTHRUN" : {
        return {resultOfgrowth: [], savedBackup: [...action.payload]};
      }
      default : {
        return {...state};
      }
    }
}
export default calculatedData;
