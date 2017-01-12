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
      case "CHANGE_PARAMRUN_POPULATION": {
        return { ...state, paramRun: { ...state.paramRun, maxPop: action.payload } }
      }
      case "CHANGE_PARAMRUN_YEARS": {
        return { ...state, paramRun: {...state.paramRun, years: action.payload }}
      }
      default : {
        return {... state};
      }
    }

}

export default baseParam
