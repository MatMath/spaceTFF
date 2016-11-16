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

calc.launchToSpaceFromEarth = () => {

};

calc.calcOneYear = (currentYear, parameters) => {
 let persPerShip = parameters.persPerShip,
 engineMalfunction = parameters.engineMalfunction,
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
  let nbrBefore = currentYear.earthFleet.length;
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
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
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(orbitRefulling, refuilingDefect);
    if (!failOrNot) {
      shipLoss++;
      death.refueling +=  persPerShip;
    }
    return failOrNot;
  });

  // Launch to Next planet
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToMars +=  persPerShip;
    }
    return failOrNot;
  });

  // Decelerate on arrival
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToMars +=  persPerShip;
    }
    return failOrNot;
  });

  // landing
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {
      shipLoss++;
      death.landingMars +=  persPerShip;
    }
    return failOrNot;
  }); //Once landing per ship :)


  // "Same time" Take what is on mars already.
  // Refulling (1x) --> No casulty if fail, just lost of ship.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, refuilingDefect);
    if (!failOrNot) {
      // No casulty if fail, just lost of ship.
      shipLoss++;
      // death.takeOff +=  0;
    }
    return failOrNot;
  });
  currentYear.martian += currentYear.earthFleet.length * persPerShip; //Amount that survived the journey.

  let nbrMarsStart = currentYear.marsFleet.length; //No loss at refueling since it is done empty of people.
  // Depart of tourist from land.
  currentYear.martian -= Math.round(currentYear.marsFleet.length * touristRatio * persPerShip);
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.marsTakeOff +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  });

  // Decelerating on Earth
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {
      shipLoss++;
      death.journeyToEarth +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  });

  // Landing back on Earth.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {
      shipLoss++;
      death.landingEarth +=  Math.round(persPerShip * touristRatio);
    }
    return failOrNot;
  }); //Once landing per ship :)


  // Adding 1 trip to all ship and retirering old one.
  let activeFleet = [];
  for (var i = 0; i < currentYear.marsFleet.length; i++) {
    currentYear.marsFleet[i].trip ++;
    if (currentYear.marsFleet[i].trip < reusabilityOfShip) {
      activeFleet.push(currentYear.marsFleet[i]);
    }

  }

  // Noticed that Mars and Earth fleet are inversed. This is because What left from Earth is now on the surface of Mars and vice versa.
  let objToReturn = {
    martian: currentYear.martian,
    earthFleet: activeFleet,
    marsFleet: currentYear.earthFleet,
    totKilledIn: death,
    shipLoss: shipLoss,
    cummulativeLife: sumObj(death)
  };
  // console.log(objToReturn);
  return objToReturn;
};

improveParam = (param) => {
  let improvement = 1 - param.improvement;
  param.engineMalfunction = param.engineMalfunction * improvement;
  param.refuilingDefect = param.refuilingDefect * improvement;
  param.landingFaillure = param.landingFaillure * improvement;
  return param;
};

calc.iterateThat = (startingData, param, maxIter, maxNbr, shipProduction) => {
  console.log("Iter", startingData.length - 1, startingData[startingData.length - 1].martian);
  if (!maxNbr || !maxNbr) {
    // Only 0+ If you put negative nbr you deserve the stackoverflow ;).
    console.log("missing arguments"); //I should really add a logger at this point.
    return startingData;
  }
  // Note: Nbr of cycle is the array length (Not nbr of years because we launch each launch window.)
  if (startingData.length >= maxIter || startingData[startingData.length - 1].martian >= maxNbr) {
    // console.log("Stopped at martian #: ", startingData.length, maxIter, startingData[startingData.length - 1].martian, maxNbr);
    return startingData;
  }

  // Before we Push the next row:
  const lastYearTotLoss =

  startingData.push(calc.calcOneYear(startingData[startingData.length - 1], param));
  startingData[startingData.length - 1].cummulativeLife += startingData[startingData.length - 2].cummulativeLife;
  // startingData[startingData.length - 1].shipLoss += startingData[startingData.length - 2].shipLoss;

  if(calc.shouldItFail(1, 1 - param.probIncreaseProdOfIts)) {
      shipProduction += param.itsIncreaseOf;
  }
  for (var i = 0; i < shipProduction; i++) {
    startingData[startingData.length - 1].earthFleet.push(data.newShip());
  }

  // Add Improvement of technology.
  param = improveParam(param);
  return calc.iterateThat(startingData, param, maxIter, maxNbr, shipProduction);

};

sumObj = ( obj ) => {
  return Object.keys( obj )
          .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
          }, 0 );
};


module.exports = calc;
