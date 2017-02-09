/*jshint esversion: 6 */
/*
 ======== A Handy Little Jasmine Reference ========
 inspired by  https://github.com/pivotal/jasmine/wiki/Matchers
 Spec matchers:
 expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
 expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
 expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
 expect(x).toBeDefined(); passes if x is not undefined
 expect(x).toBeUndefined(); passes if x is undefined
 expect(x).toBeNull(); passes if x is null
 expect(x).toBeTruthy(); passes if x evaluates to true
 expect(x).toBeFalsy(); passes if x evaluates to false
 expect(x).toContain(y); passes if array or string x contains y
 expect(x).toBeLessThan(y); passes if x is less than y
 expect(x).toBeGreaterThan(y); passes if x is greater than y
 expect(x).toBeCloseTo; matcher is for precision math comparison
 expect(x).toThrow; matcher is for testing if a function throws an exception
 expect(x).toThrowError; matcher is for testing a specific thrown exception
 expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed
 Every matcher's criteria can be inverted by prepending .not:
 expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent
 Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
 beforeEach(function() {
 this.addMatchers({});
 */

 var  calc = require('./calculation');
 var dataStructure = require('./dataStructure'); //This return a modufiable object instead of having a copy. Waiting for Import const in ES6.

sumObj = ( obj ) => {
  return Object.keys( obj )
          .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
          }, 0 );
};

 describe('validating the Calculation with different assumptions', () => {
   var parameters;
   beforeEach(() => {
     parameters = dataStructure.parameters(); // this will get the basic assomption about the model. Then we can change it according to the test.

    //  By forcing each parameters at 0 by start we can check the impact of each one by one.
     parameters.engineMalfunction = 0;
     parameters.refuilingDefect = 0;
     parameters.landingFaillure = 0;
     parameters.touristRatio = 0;
     parameters.probIncreaseProdOfIts = 0;
   });

   it('Should return a random number', () => {
     expect(calc.giveMeRandomNumber()).toBeGreaterThan(0);
   });

   it('Should fail with 100% faillure', () => {
     expect(calc.shouldItFail(42,1)).toBeFalsy();
   });

   it('Should pass with 0% faillure', () => {
     expect(calc.shouldItFail(42,0)).toBeTruthy();
   });

   it('Should test the No faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
    //  if there is no defect all should land safely.
    // console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(1);
     expect(resultOfYear0.totKilledIn.earthTakeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landingMars).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
   });

   it('Should test Engine faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 50; //Starting with 50 already.
    //  console.log("yearToTest Engine faillure:", yearToTest);

     parameters.engineMalfunction = 1; // Expectation that the engine have 100% of chance to malfunction & explode.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
    // console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(50);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.earthTakeOff).toEqual(100);
     expect(resultOfYear0.totKilledIn.landingMars).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });

   it('Should test refulling faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 100; //Starting with 100 already.
    //  console.log("yearToTest Refulling faillure:", yearToTest);

     parameters.refuilingDefect = 1; // Expectation that a refuiling attemp failed and explode/cancel the mission.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.earthTakeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landingMars).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(100);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });

   it('Should test Landing faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 100; // Starting with 100 already.
    //  console.log("yearToTest Landing faillure:", yearToTest);

     parameters.landingFaillure = 1; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
    //  if there is no defect all should land safely.
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.earthTakeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landingMars).toEqual(100);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });

   it('Test the return rate at 0-Danger', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.marsFleet.push(dataStructure.newShip());
     yearToTest.martian = 300; // Starting with 100% return but only 1 ship.
     parameters.touristRatio = 1; // Should have 100 mars tourist returning.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     expect(resultOfYear0.martian).toEqual(400); // 200 arrive, 100 leave so 400 left there.
   });

   it('Test the return rate at 0-Danger different ratio.', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.marsFleet.push(dataStructure.newShip());
     yearToTest.martian = 100; // Starting with 100 already.
     parameters.touristRatio = 0.5; // Should have 50 martian tourist returning but 100 arriving.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     expect(resultOfYear0.martian).toEqual(150);
   });

   it('Test the return rate at 100%-Danger', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.marsFleet.push(dataStructure.newShip());
     yearToTest.martian = 325; // Starting with 100% return but only 1 ship.
     parameters.touristRatio = 0.5; // Should have 50 mars tourist returning.
     parameters.engineMalfunction = 1;

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     expect(resultOfYear0.martian).toEqual(275); // 0 arrive (all crash), 50 leave so 250 left there.
     expect(resultOfYear0.totKilledIn.earthTakeOff).toEqual(200); // Earth + Mars Liftoff
     expect(resultOfYear0.totKilledIn.marsTakeOff).toEqual(50); // Earth + Mars Liftoff
     expect(resultOfYear0.cummulativeLife).toEqual(250); // Earth + Mars Liftoff
   });

   it('Test the iteration structure, no recursion', () => {
     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 0, 100, 1);
    // 0 would return directely without any recursion.
     expect(resultOfAllYear).toEqual([startPoint]);
   });

   it('Test the iteration structure, Max NbrPeople', () => {
     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 50, 2000, 1);
     lastYear = resultOfAllYear[resultOfAllYear.length - 1];
    // I said 50 iteration OR 2000 and after 8 I hit 2000 so I stop.
     expect(lastYear.martian).toEqual(2000);
   });

   it('Test the iteration structure, MaxNbrLoop', () => {
     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 100, 1000000, 1);
    // I said 50 iteration OR 2000 and after 8 I hit 2000 so I stop.
     expect(resultOfAllYear.length).toEqual(100);
   });

   it('Test the iteration structure, with Ship Population Growth', () => {
     let startPoint = dataStructure.blankYear();

     parameters.persPerShip = 10;
     parameters.cargo.current = 480;
     parameters.persIncreasePertrip = 10;

     let expectedCrew = {
       cargo: 300,
       crew: 100
     }
     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 20, 2000, 1);
    // I said 20 iteration OR 2000, but after 10 loop I should hit a constant ship crew of 100 and a cargo of 300.
     expect(resultOfAllYear[0].yearLaunch).toEqual({ cargo: parameters.cargo.current, crew: parameters.persPerShip }); // I start at Year 0 and ship X crew.
     expect(resultOfAllYear[0].yearLaunch.crew).toEqual(resultOfAllYear[1].cummulativeLife + resultOfAllYear[1].martian); // at year X+1 I have X martian or dead crew.
     expect(resultOfAllYear[1].cummulativeLife + resultOfAllYear[1].martian).toEqual(10);
     expect(resultOfAllYear[2].cummulativeLife + resultOfAllYear[2].martian).toEqual(30); // 10 from first year + 2*20 from trip 2.
     expect(resultOfAllYear[resultOfAllYear.length -2].yearLaunch).toEqual(expectedCrew); // loop is over so we dont need to know if they succede or die or how many make it.
   });

   it('test Ship increase with no faillure', () => {
     parameters.probIncreaseProdOfIts = 1;
     parameters.itsIncreaseOf = 10; //10 new ship per time with 100% success.
     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 3, 10000, 1);
     console.log(resultOfAllYear);
     lastYear = resultOfAllYear[resultOfAllYear.length - 1];
    //  Start with 1, then 1 return, we add 10 = 11 --> Mars should have 11 landed.
     expect(lastYear.marsFleet.length).toEqual(11);
    //  We increase of 10 per year and we do 3 time so 1,11,21
     expect(lastYear.currentYearItsProd).toEqual(21);

   });

   it('test Population & Ship increase with no faillure', () => {
     parameters.probIncreaseProdOfIts = 1;
     parameters.itsIncreaseOf = 1; //10 new ship per time with 100% success.
     parameters.reusabilityOfShip = 1;

     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 10, 10000, 1);
     lastYear = resultOfAllYear[resultOfAllYear.length - 1];
    //  Start with 1, then 1 return (discard it), we add 1 = 2 (10 time) --> Mars should have 9 landed.
     expect(lastYear.marsFleet.length).toEqual(9);
    //  We increase of 1 per year for 10 years so year 10 = 10 new ship.
     expect(lastYear.currentYearItsProd).toEqual(10);
   });

   it('test Population & Ship increase with no faillure, reuse 2', () => {
     parameters.probIncreaseProdOfIts = 1;
     parameters.itsIncreaseOf = 1; //10 new ship per time with 100% success.
     parameters.reusabilityOfShip = 2;

     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 10, 10000, 1);
     lastYear = resultOfAllYear[resultOfAllYear.length - 1];
    //  Since it take 2 sequence to have a ship reused at year 10 Mars send back Sequence 9 + Sequence 7 (Confusing I know, see Readme ;)
     expect(lastYear.marsFleet.length).toEqual(9+7);
    //  We increase of 1 per year for 10 years so year 10 = 10 new ship.
     expect(lastYear.currentYearItsProd).toEqual(10);
     expect(lastYear.earthFleet.length).toEqual(10+8); //(Year 10 + prod of year 8 that returned from Mars.)
   });

   it('test no-Ship increase with no faillure', () => {
     parameters.probIncreaseProdOfIts = 0;
     parameters.itsIncreaseOf = 1; //1 new ship per time with 0% success. --> No new ship
     let startPoint = dataStructure.blankYear();

     let resultOfAllYear = calc.iterateThat([startPoint], parameters, 10, 10000, 1);
     lastYear = resultOfAllYear[resultOfAllYear.length - 1];
    // Should reach the max length of 5 year of service so = 5
     expect(lastYear.marsFleet.length).toEqual(5);

   });

   it('test the transferCargoToCrew system, generic value', () => {
     let persPerShip = 50;
     let maxPersPerShip = 100;
     let persIncreasePertrip = 10;
     let cargo = {
       initial: 500,
       current: 500,
       final: 300,
       tonsPerPerson: 5
     };
     let expectation = {
       persPerShip: 60,
       currentCargo: 450
     }
     expect(calc.transferCargoToCrew(persPerShip, maxPersPerShip, cargo, persIncreasePertrip)).toEqual(expectation);
   });

   it('test the transferCargoToCrew system, lower Extreme', () => {
     let persPerShip = 0;
     let maxPersPerShip = 100;
     let persIncreasePertrip = 50;
     let cargo = {
       initial: 500,
       current: 500,
       final: 300,
       tonsPerPerson: 2
     };
     let expectation = {
       persPerShip: 50,
       currentCargo: 400
     }
     expect(calc.transferCargoToCrew(persPerShip, maxPersPerShip, cargo, persIncreasePertrip)).toEqual(expectation);
   });

   it('test the transferCargoToCrew system, half full Value', () => {
     let persPerShip = 99;
     let maxPersPerShip = 100;
     let persIncreasePertrip = 10;
     let cargo = {
       initial: 500,
       current: 302,
       final: 300,
       tonsPerPerson: 2
     };
     let expectation = {
       persPerShip: 100,
       currentCargo: 300
     }
     expect(calc.transferCargoToCrew(persPerShip, maxPersPerShip, cargo, persIncreasePertrip)).toEqual(expectation);
   });

   it('test the transferCargoToCrew system, full Value', () => {
     let persPerShip = 100;
     let maxPersPerShip = 100;
     let persIncreasePertrip = 10;
     let cargo = {
       initial: 500,
       current: 300,
       final: 300,
       tonsPerPerson: 2
     };
     let expectation = {
       persPerShip: 100,
       currentCargo: 300
     }
     expect(calc.transferCargoToCrew(persPerShip, maxPersPerShip, cargo, persIncreasePertrip)).toEqual(expectation);
   });



 });
