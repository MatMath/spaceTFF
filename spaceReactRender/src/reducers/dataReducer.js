const calculatedData = (state={
  resultOfgrowth: [],
  savedBackup: [],
  deathRatio: [],
  shipLossArray: [],
  shipProduction: [],
  fleetSize: [],
  displayGraph: ''
}, action) => {
  // switch statement here
    switch (action.type) {
      case 'FETCHED_SERVERGROWTH' : {
        return {...state, resultOfgrowth: [...action.payload]};
      }
      case 'BACKUP_GROWTHRUN' : {
        return {resultOfgrowth: [], savedBackup: [...action.payload]};
      }
      case 'BUILD_deathRatio' : {
        return {...state, deathRatio: [...action.payload]};
      }
      case 'BUILD_shipLossArray' : {
        return {...state, shipLossArray: [...action.payload]};
      }
      case 'BUILD_shipProduction' : {
        return {...state, shipProduction: [...action.payload]};
      }
      case 'BUILD_fleetSize' : {
        return {...state, fleetSize: [...action.payload]};
      }
      case 'CHANGE_displayGraph' : {
        return {...state, displayGraph: action.payload};
      }
      default : {
        return {...state};
      }
    }
};
export default calculatedData;
