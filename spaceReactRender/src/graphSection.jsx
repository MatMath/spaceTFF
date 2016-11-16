import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './index.scss'
import BarGraph from './graph/barGraph.jsx'
import PieChart from './graph/pieChart.jsx'
import GenericDotGraph from './graph/genericDotGraph.jsx'

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

export default class GraphSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth,
      savedBackup: this.props.savedBackup,
      deathRatio: this.deathRatio(this.props.resultOfgrowth),
      display: 'Yes',
      shipLossArray: [],
      displayGraph: ''
    }
    this.growthVsDeath = this.growthVsDeath.bind(this);
    this.pieChart = this.pieChart.bind(this);
    this.shipLoss = this.shipLoss.bind(this);
  }
  growthVsDeath() {
    this.setState({displayGraph:'growthVsDeath'});
  }
  pieChart() {
    this.setState({displayGraph:'pieChart'});
  }
  shipLoss() {
    let shipLossArray = this.props.resultOfgrowth.map((item)=>{
      return item.shipLoss;
    })
    this.setState({displayGraph:'shipLoss'});
    this.setState({shipLossArray: shipLossArray});
  }
  deathRatio(data) {
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
    })

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
          })
        }
      }
    }
    // Adding the missing value in Other
    if (otherTotal) {
      arrToreturn.push({
        percentage: otherTotal / total * 100,
        label: 'Other',
        value: otherTotal
      })
    }
    // console.log('arrToreturn: ', arrToreturn);
    // calculating the Percentage of each Pieces
    return arrToreturn;
  }
  render() {
    const {display, resultOfgrowth, displayGraph, savedBackup, deathRatio, shipLossArray} = this.state;
    return (
      <div>
        Graph that could be fun:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li onClick={this.pieChart}>Type of death with ratio</li>
          <li onClick={this.shipLoss}>Number of ship loss over time</li>
          <li>Ship production increase over time</li>
        </ul>

        {displayGraph == 'growthVsDeath' && <BarGraph resultOfgrowth={resultOfgrowth} savedBackup={savedBackup}></BarGraph>}
        {displayGraph == 'pieChart' && <PieChart deathRatio={deathRatio}></PieChart>}
        {displayGraph == 'shipLoss' && <GenericDotGraph shipLossArray={shipLossArray}></GenericDotGraph>}
      </div>
    )
  }
}
