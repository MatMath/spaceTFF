/*jshint esversion: 6 */
// Function and variable needed:

// Loss of life:
// Faillure % at launch?
// Faillure % per motor activation?
// Faillure % per refulling attemp.
// Failed % per landing.
// Death ratio per year per lack of medical Care/Accident/Other.

// Variable needed:
// var persPerShip = 100;
// var engineMalfunction = 0.00; // Expectation that the engine have 1% of chance to malfunction & explode.
// var refuilingDefect = 0.00; // Expectation that a refuiling attemp failed and explode/cancel the mission.
// var landingFaillure = 0.0; // Stack on top of the engine faillure.

const data = require('./dataStructure');

// Object needed:
const calc = {};

calc.giveMeRandomNumber = () => {
  return Math.random();
};

calc.shouldItFail = (nbrTime, failRatio) => {
  // This is a Crude calculation but will give the % in the long run. We could adapt a more fancy algorithm but normally the algo is already there to find the failRatio.
  for(let i=0; i < nbrTime; i++) {
    if(Math.random() < failRatio) return false; // Catastrophic faillure so flight crash.
  }
  return true; //All Good.
};

calc.transferCargoToCrew = (persPerShip, maxPersPerShip, cargo, persIncreasePertrip) => {
  let currentCrew = persPerShip;
  let currentCargo = cargo.current;
  // cargo: {
  //   initial: 500,
  //   current: 300,
  //   final: 300,
  //   tonsPerPerson: 2
  // }

  // Step1: Should we increase or we are at maximum?
  if (currentCrew < maxPersPerShip) {
    // Check if we add the max we bust the calculation or not
    if (currentCrew + persIncreasePertrip < maxPersPerShip) {
      // Great
      currentCrew += persIncreasePertrip;
      currentCargo -= (cargo.tonsPerPerson * persIncreasePertrip);
    } else {
      // Do a prorata of people.
      currentCargo -= (cargo.tonsPerPerson * (maxPersPerShip - currentCrew));
      currentCrew = maxPersPerShip;
      // Step2: Transfer the cargo to crew
    }
  }
  return {
    persPerShip: currentCrew,
    currentCargo: currentCargo
  }
}

calc.calcOneYear = (currentYear, parameters, shipProduction) => {
 let scopedYear = Object.assign({}, currentYear);
 scopedYear.earthFleet = [...currentYear.earthFleet] // Because Object.assign do not do a deep copy.
 scopedYear.marsFleet = [...currentYear.marsFleet] // Because Object.assign do not do a deep copy.
 let persPerShip = parameters.persPerShip;
 let engineMalfunction = parameters.engineMalfunction,
 refuilingDefect = parameters.refuilingDefect,
 landingFaillure = parameters.landingFaillure,
 firstStageEngine = parameters.firstStageEngine,
 orbitRefulling = parameters.orbitRefulling,
 itsEngine = parameters.itsEngine,
 touristRatio = parameters.touristRatio,
 reusabilityOfShip = parameters.reusabilityOfShip;

  // Steps: Way there
  // Launch from Earth to Orbit
  let shipLoss = 0;
  let death = data.killedOption();
  let nbrBefore = scopedYear.earthFleet.length;
  scopedYear.earthFleet = scopedYear.earthFleet.filter(() => {
      // We currently dont care about the object itself, we just want to randomely check if it pass or fail
      // if it fail it is automatically removed from the list. so we can test the next risk.
      let failOrNot = calc.shouldItFail(firstStageEngine, engineMalfunction);
      if (!failOrNot) {
        shipLoss++;
        death.earthTakeOff +=  persPerShip;
      }
      return failOrNot;
    }
  );

  // Refuel in orbit (4x)
  scopedYear.earthFleet = scopedYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(orbitRefulling, refuilingDefect);
    if (!failOrNot) {
      shipLoss++;
      death.refueling +=  persPerShip;
    }
    return failOrNot;
  });

  // Launch to Next planet
  scopedYear.earthFleet = scopedYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToMars +=  persPerShip;
    }
    return failOrNot;
  });

  // Decelerate on arrival
  scopedYear.earthFleet = scopedYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToMars +=  persPerShip;
    }
    return failOrNot;
  });

  // landing
  scopedYear.earthFleet = scopedYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {
      shipLoss++;
      death.landingMars +=  persPerShip;
    }
    return failOrNot;
  }); //Once landing per ship :)


  // "Same time" Take what is on mars already.
  // Refulling (1x) --> No casulty if fail, just lost of ship.
  scopedYear.marsFleet = scopedYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, refuilingDefect);
    if (!failOrNot) {
      // No casulty if fail, just lost of ship.
      shipLoss++;
      // death.takeOff +=  0;
    }
    return failOrNot;
  });
  scopedYear.martian += scopedYear.earthFleet.length * persPerShip; //Amount that survived the journey.

  let nbrMarsStart = scopedYear.marsFleet.length; //No loss at refueling since it is done empty of people.
  // Depart of tourist from land.
  scopedYear.martian -= Math.round(scopedYear.marsFleet.length * touristRatio * persPerShip);
  scopedYear.marsFleet = scopedYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.marsTakeOff +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  });

  // Decelerating on Earth
  scopedYear.marsFleet = scopedYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToEarth +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  });

  // Landing back on Earth.
  scopedYear.marsFleet = scopedYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {
      shipLoss++;
      death.landingEarth +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  }); //Once landing per ship :)


  // Adding 1 trip to all ship and retirering old one.
  let activeFleet = [];
  for (var i = 0; i < scopedYear.marsFleet.length; i++) {
    scopedYear.marsFleet[i].trip ++;
    if (scopedYear.marsFleet[i].trip < reusabilityOfShip) {
      activeFleet.push(scopedYear.marsFleet[i]);
    }

  }

  // Noticed that Mars and Earth fleet are inversed. This is because What left from Earth is now on the surface of Mars and vice versa.
  let objToReturn = {
    martian: scopedYear.martian,
    earthFleet: activeFleet,
    marsFleet: scopedYear.earthFleet,
    totKilledIn: death,
    shipLoss: shipLoss,
    cummulativeLife: sumObj(death),
    currentYearItsProd: shipProduction
  };
  // console.log('NEW YEAR:',objToReturn);
  return objToReturn;
};

improveParam = (param) => {
  // es7 spread would be more simple here, but I dont feel like adding transpiler in this tiny project.
  let improvement = 1 - param.improvement;
  let functionalParamObj = Object.assign({}, param);
  functionalParamObj.cargo = Object.assign({}, param.cargo);
  functionalParamObj.engineMalfunction = param.engineMalfunction * improvement;
  functionalParamObj.refuilingDefect = param.refuilingDefect * improvement;
  functionalParamObj.landingFaillure = param.landingFaillure * improvement;
  let crewCargo = calc.transferCargoToCrew(param.persPerShip, param.maxPersPerShip, param.cargo, param.persIncreasePertrip);
  functionalParamObj.persPerShip = crewCargo.persPerShip;
  functionalParamObj.cargo.current = crewCargo.currentCargo;
  return functionalParamObj;
};

calc.iterateThat = (startingData, param, maxIter, maxNbr, shipProduction) => {
  // console.log("Iter", startingData.length - 1, startingData[startingData.length - 1].martian);
  if (!maxNbr || !maxNbr) {
    // Only 0+ If you put negative nbr you deserve the stackoverflow ;).
    console.log("missing arguments"); //I should really add a logger at this point.
    return startingData;
  }
  // Note: Nbr of cycle is the array length (Not nbr of years because we launch each launch window.)
  if (startingData.length >= maxIter || startingData[startingData.length - 1].martian >= maxNbr) {
    //console.log("Stopped at martian #: ", startingData.length, maxIter, startingData[startingData.length - 1].martian, maxNbr);
    return startingData;
  }

  // The Generic data start with a fleet of 0, Good. but we need to add one here before calculating the number of people that reach destination on next round.
  if (startingData.length === 1) {
    // We have a Blank Structure so Construct Ship and send them.
    startingData[startingData.length - 1].currentYearItsProd = shipProduction;
    for (var i = 0; i < shipProduction; i++) {
      startingData[startingData.length - 1].earthFleet.push(data.newShip());
    }
  }

  // We need to set that here because the Crew will depart with the Earth Fleet just added and go trough testing and then arrive at loop X+1;
  startingData[startingData.length - 1].yearLaunch = {
    cargo: param.cargo.current,
    crew: param.persPerShip
  };

  // Before we Push the next row: we will have ALL the data we need here (all enclosed)
  // console.log('startingData:', startingData);
  startingData.push(calc.calcOneYear(startingData[startingData.length - 1], param, shipProduction));
  startingData[startingData.length - 1].cummulativeLife += startingData[startingData.length - 2].cummulativeLife;
  // startingData[startingData.length - 1].shipLoss += startingData[startingData.length - 2].shipLoss;

  // For next round we will have more ship produce or not
  if(calc.shouldItFail(1, 1 - param.probIncreaseProdOfIts)) {
    shipProduction += param.itsIncreaseOf;
  }
  
  startingData[startingData.length - 1].currentYearItsProd = shipProduction;
  for (var i = 0; i < shipProduction; i++) {
    startingData[startingData.length - 1].earthFleet.push(data.newShip());
  }

  // Add Improvement of technology.
  return calc.iterateThat(startingData, improveParam(param), maxIter, maxNbr, shipProduction);

};

sumObj = ( obj ) => {
  return Object.keys( obj )
          .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
          }, 0 );
};


module.exports = calc;
