/*jshint esversion: 6 */
var data = {}; //until Import work out of the box and I can use const.

data.newShip = () => {
  return Object.assign({},{trip:0});
};

data.blankYear = () => {
 return Object.assign({}, {
   martian: 0,
   earthFleet: [],
   marsFleet: [],
   totKilledIn: {},
   shipLoss: 0,
   cummulativeLife: 0
 });
};

data.killedOption = () => {
  return Object.assign({}, {
    earthTakeOff: 0,
    marsTakeOff: 0,
    journeyToEarth: 0,
    journeyToMars: 0,
    landingEarth: 0,
    landingMars: 0,
    refueling: 0
  });
};

data.parameters = () => {
  // persPerShip: 100,
  // engineMalfunction: 0.01, Each engine can fail.
  // refuilingDefect: 0.02, Each manuever can fail like failling
  // landingFaillure: 0.05, Landing is tricky.
  // reusabilityOfShip: 5, Nbr of time a ship can be use (Not years)
  // improvement: 0.05, % improvement of faillure (1-improvement) * Faillure
  // firstStageEngine: 42,
  // itsEngine: 9,
  // touristRatio: 0.3, Nbr of people who want to come back on each ship.
  // orbitRefulling: 4,
  // probIncreaseProdOfIts: 0, Chance to increase the production of ITS from 1 per cycle to "X"
  // itsIncreaseOf: 1, if probIncreaseProdOfIts succede, we increase the last nbr by this one.
  return Object.assign({},
    {
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
      probIncreaseProdOfIts: 0.2,
      itsIncreaseOf: 1,
      maxPop: 1000000,
      years: 100
    }
  );
};

module.exports = data;
