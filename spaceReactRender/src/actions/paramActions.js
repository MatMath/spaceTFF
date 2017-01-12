// Actions are cherrypick from the app.jsx and run. The action publish a type that the "store" catch and with the payload the "store" know what to do with it.
// type is important and immutable, the payload can be rename or extra item added too.

export function changeMaxPopulation(pop) {
  return {
    type: "CHANGE_PARAMRUN_POPULATION",
    payload: pop
  }
}

export function changeYears(years) {
  return {
    type: "CHANGE_PARAMRUN_YEARS",
    payload: years
  }
}

export function change_baseParam_paramServer(key, floatValue) {
  let type = "CHANGE_BASEPARAM_PARAMSERVER_" + key;
  return {
    type: type,
    payload: floatValue
  }
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
      dispatch({ type: "FETCHED_SERVERPARAM", payload: data})
    })
    .catch(function(err) {
      // Fail to fetch so keep using the default value.
      dispatch({ type: "FETCHED_SERVERPARAM_FAILED", payload: err})
    })
  }
}
