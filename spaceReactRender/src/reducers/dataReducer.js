import {calculateDeathRatio, calculateShipLoss, calculateFleetSize, calculateProdIncrease} from '../actions/calculationActions';

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
        let objToReturn = {...state,
          deathRatio: [],
          shipLossArray: [],
          shipProduction: [],
          fleetSize: [],
          resultOfgrowth: [...action.payload]
        };
        // For User experience wise if the user selected a graph and do a new run
        // we want to keep the graph active (visible) but also not calculate all the possible data of
        // all the graph at every run. Simple option would be to put displayGraph='', smart processor way is to calculate value on demand.
        if (state.displayGraph === 'pieChart') {
          objToReturn.deathRatio= calculateDeathRatio(action.payload);
        } else if (state.displayGraph === 'shipLoss') {
          objToReturn.shipLossArray = calculateShipLoss(action.payload);
          objToReturn.fleetSize = calculateFleetSize(action.payload);
        } else if (state.displayGraph === 'prodIncrease') {
          objToReturn.shipProduction = calculateProdIncrease(action.payload);
        }

        return objToReturn;
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
