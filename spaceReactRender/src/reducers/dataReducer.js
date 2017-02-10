import {calculateDeathRatio, calculateShipLoss, calculateFleetSize, calculateProdIncrease} from '../actions/calculationActions';

const calculatedData = (state={
  resultOfgrowth: [],
  savedBackup: [],
  deathRatio: [],
  shipLossArray: [],
  shipProduction: [],
  fleetSize: [],
  currentBackup: [],
  displayGraph: '',
  fetching: false
}, action) => {
  // switch statement here
    switch (action.type) {
      case 'FETCHED_STARTING' : {
        return {...state, fetching: true };
      }
      case 'FETCHED_SERVERPARAM_FAILED' : {
        return {...state, fetching: false };
      }
      case 'FETCHED_SERVERGROWTH' : {
        let objToReturn = {...state,
          deathRatio: [],
          shipLossArray: [],
          shipProduction: [],
          fleetSize: [],
          fetching: false,
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
        let newBackup = [];
        newBackup.unshift(action.payload, ...state.savedBackup);
        // This will create [[run2], [run1], [run0]]
        return {...state, displayGraph: '', resultOfgrowth: [], savedBackup: newBackup, currentBackup: [...action.payload]};
      }
      case 'CHANGE_CURRENT_BACKUP' : {
        return {...state, currentBackup: state.savedBackup[action.payload]};
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
