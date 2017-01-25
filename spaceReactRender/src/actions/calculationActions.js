// Utility function:
let add2Objects = (previousObj, currentObj) => {
  for (var key in currentObj) {
    if (currentObj.hasOwnProperty(key)) {
      if (previousObj === undefined) {previousObj = {};}
      if (!previousObj.hasOwnProperty(key) || previousObj[key] === undefined) {
        previousObj[key] = 0;
      }
      previousObj[key] += currentObj[key];
    }
  }
  return previousObj;
};

// Exported functions
export function calculateDeathRatio (data) {
    let arrToreturn = [];
    let total = 0;

    let totKilledIn = data.map((item) => {
      // We check each section to see if there is any death at that time if so we make a aray of them
      if (item.totKilledIn && Object.keys(item.totKilledIn).length > 0) {
        return item.totKilledIn;
      }
    }).reduce((previousObj, currentObj) =>{
      // We combine and sum all data to have 1 object with the sum of each defect
      return add2Objects(previousObj, currentObj);
    });

    // console.log('Total Killed in', totKilledIn);
    // Going trough all key of the Object and pushing them into a Array to feed to the BarGraph with percentage.
    for (let key in totKilledIn) {
      if (totKilledIn.hasOwnProperty(key)) {
        // Summing everything so we can add up to 100% after.
        total += totKilledIn[key];
      }
    }

    var otherTotal = 0;
    for (let key in totKilledIn) {
      if (totKilledIn.hasOwnProperty(key)) {
        // If something is lower than 1% Group them after.
        if (totKilledIn[key] / total < 0.05) {
          otherTotal += totKilledIn[key];
        } else {
          arrToreturn.push({
            percentage: totKilledIn[key] / total * 100,
            label: key,
            value: totKilledIn[key]
          });
        }
      }
    }
    // Adding the missing value in Other
    if (otherTotal) {
      arrToreturn.push({
        percentage: otherTotal / total * 100,
        label: 'Other',
        value: otherTotal
      });
    }

    // calculating the Percentage of each Pieces
    return arrToreturn;
}

export function calculateShipLoss (resultOfgrowth) {
  // This build the 'shipLossArray' object
  return resultOfgrowth.map((item)=>{
      return item.shipLoss;
    });
}

export function calculateFleetSize (resultOfgrowth) {
  // this will return the "fleetSize" calculation.
  return resultOfgrowth.map((item)=>{ return (item.earthFleet.length + item.marsFleet.length); });
}

export function changeDisplayGraph (newType) {
  if (newType) {
    return {
      type: 'CHANGE_displayGraph',
      payload: newType
    };
  }
}

export function calculateProdIncrease (resultOfgrowth) {
  // this will give the 'shipProduction' value
  return resultOfgrowth.map((item)=>{ return item.currentYearItsProd; });
}
