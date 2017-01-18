const baseParam = (state={
  paramServer: {
    persPerShip: 100,
    engineMalfunction: 0.01,
    refuilingDefect: 0.02,
    landingFaillure: 0.05,
    reusabilityOfShip: 5,
    improvement: 0.05,
    firstStageEngine: 42,
    itsEngine: 9,
    touristRatio: 0.3,
    orbitRefulling: 4,
    probIncreaseProdOfIts: 0,
    itsIncreaseOf: 1
  },
  paramRun: {
    maxPop: 1000,
    years: 100
  },
  fetched: false
}, action) => {
    //Switch statement here to change value by value.
    switch (action.type) {
      case "FETCHED_SERVERPARAM": {
        return { ...state,
          fetched: true,
          paramServer: action.payload
        }
      }
      case "FETCHED_SERVERPARAM_FAILED": {
        // TODO: Improve the logic or pass the error or something more generic???.
        return { ...state, fetched: false, fetchError: action.payload, error: "Failed to fetch the param, communication problem with the server"}
      }

      case "CHANGE_BASEPARAM_PARAMSERVER_persPerShip": {
        return { ...state, paramServer: { ...state.paramServer, persPerShip: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_engineMalfunction": {
        return { ...state, paramServer: { ...state.paramServer, engineMalfunction: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_refuilingDefect": {
        return { ...state, paramServer: { ...state.paramServer, refuilingDefect: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_landingFaillure": {
        return { ...state, paramServer: { ...state.paramServer, landingFaillure: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_reusabilityOfShip": {
        return { ...state, paramServer: { ...state.paramServer, reusabilityOfShip: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_improvement": {
        return { ...state, paramServer: { ...state.paramServer, improvement: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_firstStageEngine": {
        return { ...state, paramServer: { ...state.paramServer, firstStageEngine: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_itsEngine": {
        return { ...state, paramServer: { ...state.paramServer, itsEngine: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_touristRatio": {
        return { ...state, paramServer: { ...state.paramServer, touristRatio: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_orbitRefulling": {
        return { ...state, paramServer: { ...state.paramServer, orbitRefulling: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_probIncreaseProdOfIts": {
        return { ...state, paramServer: { ...state.paramServer, probIncreaseProdOfIts: action.payload } }
      }
      case "CHANGE_BASEPARAM_PARAMSERVER_itsIncreaseOf": {
        return { ...state, paramServer: { ...state.paramServer, itsIncreaseOf: action.payload } }
      }

      case "CHANGE_PARAMRUN_POPULATION": {
        return { ...state, paramRun: { ...state.paramRun, maxPop: action.payload } }
      }
      case "CHANGE_PARAMRUN_YEARS": {
        return { ...state, paramRun: {...state.paramRun, years: action.payload }}
      }
      default : {
        return { ...state};
      }
    }

}

export default baseParam
