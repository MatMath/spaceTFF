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
    savedBackup: state.calculatedData.savedBackup,
    deathRatio: state.calculatedData.deathRatio,
    shipLossArray: state.calculatedData.shipLossArray,
    shipProduction: state.calculatedData.shipProduction,
    fleetSize: state.calculatedData.fleetSize,
    displayGraph: state.calculatedData.displayGraph
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

  render() {
    const {displayGraph, deathRatio, shipLossArray, shipProduction, fleetSize, resultOfgrowth, savedBackup} = this.props;
    if (resultOfgrowth.length ===0 ) { return (<div></div>); }
    return (
      <div>
        Graph:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li onClick={this.pieChart}>Type of death with ratio</li>
          <li onClick={this.shipLoss}>Number of ship loss over time</li>
          <li onClick={this.prodIncrease}>Ship production increase over time</li>
        </ul>
        {displayGraph == 'growthVsDeath' && <BarGraph resultOfgrowth={resultOfgrowth} savedBackup={savedBackup}></BarGraph>}
        {displayGraph == 'pieChart' && <PieChart deathRatio={deathRatio}></PieChart>}
        {displayGraph == 'shipLoss' && <GenericDotGraph
          imputArray={[shipLossArray, fleetSize]}
          labelArray={[{label:'Ship Loss', color:'red'}, {label:'Fleet Size', color:'blue'}]}
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
