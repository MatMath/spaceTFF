# spaceTFF
I always been fascinated about Space exploration and everything around it. Often I just run the calculation on my side and do nothign about it. But Instead I wanted to improve my Node, React, svg skills so why not build it. "Currently" working [here](http://34.192.176.238:8080/) .

## How to run?
Locally: Go in the 2 folder and run the server and then the front end.
In each folder run:
- $ npm install
- $ npm start

To deploy on a AWS server you need to build it so look at **AWS_setup.txt**

## Server side: "SpaceServer"
The server side contain all the matematical calculation for probability. The front-end send a list of requirement like:
```
{
    "persPerShip":100,
    "engineMalfunction":0.01, --> Chance that each engine break every time we start it
    "refuilingDefect":0.02,   --> Chance that refuiling (land or space) cause defect
    "landingFaillure":0.05,   --> Chance to crash
    "reusabilityOfShip":5,    --> Nbr of time a ITS can be reused
    "improvement":0.05,       --> Reducing the faillure by x% 2% * (1-5%)
    "firstStageEngine":42,    --> Nbr of engine used to exit air
    "itsEngine":9,            --> Nbr of engine in the ITS
    "touristRatio":0.3,       --> Nbr of tourist that return on each trip (after 2 year).
    "orbitRefulling":4,       --> Nbr of refuiling needed in space.
    "probIncreaseProdOfIts":0.2,  --> Chance we can produce more ship per year
    "itsIncreaseOf":1,    --> Quantity increase if we produce more
    "maxPop":1000000,     --> Population to reach
    "years":100           --> Nbr of time to run the experiment (max Years or Pop)
}
```
Then the server crunch the data and send back a array of every years calculated by recursion.
Path options:
- get "/" = Exemple
- get "/param" = List of the initial param.
- post "/results" = Run the calculation.

## Application: "spaceReactRender"
UI to allow you to control the data and make experiment and to see the analytics of it and also compare a run to a previous one.

## Not considered
Some aspect are not considered in the model that can be added easily in the recursion like:
- Normal population growth (baby)
- Accidental death
- Normal death (age, diseases, radiation, Predator ;)
