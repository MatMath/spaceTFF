# SpaceServer
Just a node server that serve some data when asked. Yes It can be calculated in the front-end by react, but where is the fun in that?

# Confusion:
Some aspect can be confusing because of orbital mechanics and it take forever to do each sequence.
Earth Fleet: Number of ship that leave Earth at years X to transit to Mars.
MarsFleet: Number of ship that leave Mars to transit to Earth.
currentYearItsProd: Number of new ship we produce this sequence.

```
[ { martian: 100,           --> 1 ship made it (with 100/ship) so we now have 100
    earthFleet: [ [Year 0] ],
    marsFleet: [],
    currentYearItsProd: 1,
  },

  { martian: 300,         --> Year 1 100 + current year of 2 ship of 100.
    earthFleet: [ [Year 1], [Year 1] ],   --> We produce 2 new ship + launch them
    marsFleet: [ [Year 0] ],             --> Is in transit back from Mars to earth
    currentYearItsProd: 2
  },

  { martian: 700,
    earthFleet: [ [Year 0], [Year 2], [Year 2], [Year 2] ], --> Year-0 Ship that travel back from Mars AND 3 new ship built.
    marsFleet: [ [Year1], [Year1] ],
    currentYearItsProd: 3
  },

  { martian: 1300,
    earthFleet: [ [Year 1], [Year 1], [Year3], [Year3], [Year3], [Year3] ],
    marsFleet: [ [Year 0], [Year 2], [Year 2], [Year 2] ],
    currentYearItsProd: 4
  }
```
What is confusing is that when we send a ship at year 0, it get back in the transfers Orbit of Year 2 and we can use it again in year 4 not before. It is not efficient to get the ship from Year 0 back to be use again on year 2. It will be back on year 2 but a few month after the transfers windows is close to ship again.
