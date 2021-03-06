import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

// import styles from './index.scss';
import BarGraph from '../graph/barGraph.jsx';
import PieChart from '../graph/pieChart.jsx';
import GenericDotGraph from '../graph/genericDotGraph.jsx';

// importing actions needed:
import {calculateDeathRatio, changeDisplayGraph, calculateShipLoss, calculateFleetSize, calculateProdIncrease} from '../actions/calculationActions';

//Building the mapping of States and actions:
const mapGraphStateToProps = (state) => {
  let objToKeep = {
    resultOfgrowth: state.calculatedData.resultOfgrowth,
    currentBackup: state.calculatedData.currentBackup,
    deathRatio: state.calculatedData.deathRatio,
    shipLossArray: state.calculatedData.shipLossArray,
    shipProduction: state.calculatedData.shipProduction,
    fleetSize: state.calculatedData.fleetSize,
    displayGraph: state.calculatedData.displayGraph,
    backupLength: state.calculatedData.savedBackup.length
  };
  return objToKeep;
};

const mapDispatchToProps = dispatch => {
  return {
    buildGrowthBarChart: () => {
      dispatch(changeDisplayGraph('growthVsDeath'));
    },
    builPieChart: (resultOfgrowth) => {
      dispatch({
        type: 'BUILD_deathRatio',
        payload: calculateDeathRatio(resultOfgrowth)
      });
      dispatch(changeDisplayGraph('pieChart'));
    },
    buildShipLossData: (resultOfgrowth) => {
      dispatch({
        type: 'BUILD_shipLossArray',
        payload: calculateShipLoss(resultOfgrowth)
      });
      dispatch({
        type: 'BUILD_fleetSize',
        payload: calculateFleetSize(resultOfgrowth)
      });
      dispatch(changeDisplayGraph('shipLoss'));
    },
    buildProdIncreaseChart: (resultOfgrowth) => {
      dispatch({
          type: 'BUILD_shipProduction',
          payload: calculateProdIncrease(resultOfgrowth)
        });
      dispatch(changeDisplayGraph('prodIncrease'));
    },
    changeCurrentBackup: (indexToSelect) => {
      dispatch({
          type: 'CHANGE_CURRENT_BACKUP',
          payload: indexToSelect
        });
    }
  };
};

// Render of the HTML with arguments passed:

const GraphSection = React.createClass({
  growthVsDeath() {
    this.props.buildGrowthBarChart(this.props.resultOfgrowth); },
  pieChart() { this.props.builPieChart(this.props.resultOfgrowth);},
  shipLoss() { this.props.buildShipLossData(this.props.resultOfgrowth); },
  prodIncrease() { this.props.buildProdIncreaseChart(this.props.resultOfgrowth); },
  changeCurrentBackup(event) { this.props.changeCurrentBackup(event.target.value); },

  render() {
    const {displayGraph, deathRatio, shipLossArray, shipProduction, fleetSize, resultOfgrowth, currentBackup, backupLength} = this.props;
    var selectorOptions = [];
    for (let i=0; i < backupLength; i++) {
      let txt = i;
      if (i === 0) {
        txt = 'last backup saved';
      } else if (i === backupLength - 1) {
        txt = 'first backup';
      }
      selectorOptions.push(<option key={i} value={i}>Go to {txt}</option>);
    }
    if (resultOfgrowth.length === 0 ) { return (<div></div>); }
    return (
      <div>
        <div>
          {backupLength > 1 &&
            <select onChange={this.changeCurrentBackup}>
              {selectorOptions}
            </select>
          }
        </div>

        Graph:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li onClick={this.pieChart}>Type of death with ratio</li>
          <li onClick={this.shipLoss}>Number of ship loss over time</li>
          <li onClick={this.prodIncrease}>Ship production increase over time</li>
        </ul>
        {displayGraph == 'growthVsDeath' && <BarGraph resultOfgrowth={resultOfgrowth} savedBackup={currentBackup}></BarGraph>}
        {displayGraph == 'pieChart' && <PieChart deathRatio={deathRatio}></PieChart>}
        {displayGraph == 'shipLoss' && <GenericDotGraph
          imputArray={[fleetSize, shipLossArray]}
          labelArray={[{label:'Fleet Size', color:'blue'}, {label:'Ship Loss', color:'red'}]}
          xaxis='Period'
          yaxis='# Ship'
          title='Ship Loss over time'></GenericDotGraph>}
        {displayGraph == 'prodIncrease' && <GenericDotGraph
          imputArray={[shipProduction]}
          labelArray={[{label:'Ship Production', color:'blue'}]}
          xaxis='Period'
          yaxis='Production'
          title='Ship Production over time'></GenericDotGraph>}
      </div>
    );
  }
});

// connection the 2 section:
export default connect(mapGraphStateToProps, mapDispatchToProps)(GraphSection);
