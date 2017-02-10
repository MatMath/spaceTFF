export function getGrowthProjection (HTTP_SERVER, param) {
  return function(dispatch) {
    dispatch( { type: 'FETCHED_STARTING'} );  // so the user dosent monkey click 10 time to get a run of 1000 items at once. 
    fetch(HTTP_SERVER+'/results',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({param:param})
    })
    .then(function(res) {
      // This return the header call of the function, not the data.
      return res.json();
    })
    .then(function(data){
      if (data[0]) {
        // TODO: Could Add the logic here to make sure I have the proper info inside.
        dispatch({ type: 'FETCHED_SERVERGROWTH', payload: data});
      }
    })
    .catch(function(err) {
        console.log('Fetching growth Failed:', err);
        dispatch({ type: 'FETCHED_SERVERPARAM_FAILED', payload: err});
      });
  };
}

export function saveThisBackup(resultOfgrowth) {
  return {
    type: 'BACKUP_GROWTHRUN',
    payload: resultOfgrowth
  };
}
