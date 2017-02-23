# SpaceServer
Just a node server that serve some data when asked. Yes It can be calculated in the front-end by react, but where is the fun in that?

# Confusion:
Some aspect can be confusing because of orbital mechanics and it take forever to do each sequence.
Earth Fleet: Number of ship that leave Earth at years X to transit to Mars.
MarsFleet: Number of ship that leave Mars to transit to Earth.
currentYearItsProd: Number of new ship we produce this sequence.

```
--> Initial State years: 0
[ { martian: 0,           
    currentYearItsProd: 1,  --> We can produce 1 ship
    earthFleet: [ [Year 1] ], --> We have 1 ship (just produced)
    marsFleet: [],
    yearLaunch:{
      cargo: 400,
      crew: 50  --> Send 50 people /ship
    },
  },

  { martian: 50,           --> Year 1: 50 made it (1*50) and were not destroy in the trip.
    currentYearItsProd: 2,
    earthFleet: [ [Year 2], [Year 2] ],   --> We produce 2 new ship + launch them
    marsFleet: [ [Year 1] ],             --> Is in transit back from Mars to earth
    yearLaunch:{
      cargo: 380, --> More people = Less cargo space
      crew: 55    --> Send 55 people /ship
    }
  },

  { martian: 160,         --> Year1 + 2*Year2 (50+2*55)
    earthFleet: [ [Year 1], [Year 3], [Year 3], [Year 3] ], --> Year-1 Ship that travel back from Mars AND 3 new ship built.
    marsFleet: [ [Year 2], [Year 2] ],
    currentYearItsProd: 3,
    yearLaunch:{
      cargo: 360,
      crew: 60
    }
  },

  { martian: 400,         --> 160 + 3*Year3(60) + 1*Reused_Year1(60)
    earthFleet: [ [Year 2], [Year 2], [Year4], [Year4], [Year4], [Year4] ],
    marsFleet: [ [Year 1], [Year 3], [Year 3], [Year 3] ],
    currentYearItsProd: 4,
    yearLaunch:{
      cargo: 0,
      crew: 0
    }
  }
```
What is confusing is that when we send a ship at year 1, it get back in the transfers Orbit of Year 2 and we can use it again in year 3 not before. It is not efficient to get the ship from Year 1 back to be use again on year 2. It will be back on year 2 but a few month after the transfers windows is close to ship again.
