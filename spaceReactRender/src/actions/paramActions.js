// Actions are cherrypick from the app.jsx and run. The action publish a type that the 'store' catch and with the payload the "store" know what to do with it.
// type is important and immutable, the payload can be rename or extra item added too.

export function changeMaxPopulation(pop) {
  if (pop > 1000000) {
    pop = 1000000;
  }
  return {
    type: 'CHANGE_PARAMRUN_POPULATION',
    payload: pop
  };
}

export function changeYears(years) {
  if (years > 250) {
    years = 250;
  }
  return {
    type: 'CHANGE_PARAMRUN_YEARS',
    payload: years
  };
}

export function change_baseParam_paramServer(key, floatValue) {
  let type = 'CHANGE_BASEPARAM_PARAMSERVER_' + key;
  return {
    type: type,
    payload: floatValue
  };
}

export function getServerParam(HTTP_SERVER) {
  return function(dispatch) {
    fetch(HTTP_SERVER+'/param',{
      method: 'GET',
      ContentType: 'json'
    })
    .then(function(res) {
      // This return the header call of the function, not the data.
      return res.json();
    })
    .then(function(data){
      dispatch({ type: 'FETCHED_SERVERPARAM', payload: data});
    })
    .catch(function(err) {
      // Fail to fetch so keep using the default value.
      dispatch({ type: 'FETCHED_SERVERPARAM_FAILED', payload: err});
    });
  };
}

export function changeCargoItem(key, cargo, intValue, currentCrew, maxCrew) {
  // cargo: {
  //   initial: 500,
  //   current: 300,
  //   final: 300,
  //   tonsPerPerson: 2
  // },
  let newCargo = {...cargo, [key]: intValue};
  newCargo.tonsPerPerson = (newCargo.initial - newCargo.final) / maxCrew;
  newCargo.current = newCargo.initial - newCargo.tonsPerPerson*currentCrew;
  return {
    type: 'CHANGE_BASEPARAM_PARAMSERVER_cargo',
    payload: newCargo
  };
}

export function change_baseParam_paramServer_maxPersPerShip(intValue, cargo, currentCrew) {
  // maxPersPerShip will affect the cargo per Person & current cargo
  let type = 'CHANGE_BASEPARAM_PARAMSERVER_maxPersPerShip';
  if (intValue<5) { intValue = 5; } // The maximum should be at least 5 people crew :|
  let newCargo = {...cargo};
  newCargo.tonsPerPerson = (newCargo.initial - newCargo.final) / intValue;
  newCargo.current = newCargo.initial - newCargo.tonsPerPerson*currentCrew;
  return {
    type: type,
    payload: intValue,
    cargo: newCargo
  };
}

export function change_baseParam_paramServer_persPerShip(intValue, cargo, maxPersPerShip) {
  // persPerShip will affect the current cargo
  let type = 'CHANGE_BASEPARAM_PARAMSERVER_persPerShip';
  if (intValue>maxPersPerShip) { intValue = maxPersPerShip; }
  let newCargo = {...cargo};
  newCargo.tonsPerPerson = (newCargo.initial - newCargo.final) / maxPersPerShip;
  newCargo.current = newCargo.initial - newCargo.tonsPerPerson*intValue;
  return {
    type: type,
    payload: intValue,
    cargo: newCargo
  };
}
