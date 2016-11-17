import React from 'react'

import GraphBar from './graphBar.jsx'
import styles from './lineGraph.scss'

var imputArray = [
  [5,6,7,12],
  [5,2,10,2],
  [5,20,7,12]
];
var labelArray = [{label:'Item 1 to display', max:12}, {label:'Item 2 to display', max:10}, {label:'Item 3 to display', max:20}]
var graphWidth = 700;
var graphHeight = 400;
var yZero = graphHeight - 30;

export default class GenericBarGraph extends React.Component {
  // This is the Graph itself.
  constructor (props) {
    super(props);
    this.state = {
      arrayOfArray: imputArray,
      maximum: this.getInputmax(labelArray),
      labelList: this.getInputLabels(labelArray),
      xAxisGrid: this.getXAxisGrid(imputArray[0].length),
      yAxisGrid: this.getYAxisGrid(this.getInputmax(labelArray)),
      axis:{
        x: 'Period',
        y: '# Loss'
      },
      title: 'Ship Loss over time'
    }
  }
  getInputmax(labelArray) {
      var max = 0;
      let arrOfMax = labelArray.map((arrX) => {
        console.log('max : ', arrX, arrX.max);
        if (arrX.max > max) {
          max = arrX.max;
        }
      });
      return max;
  }
  getXAxisGrid(maximum) {
    let XAxisValue = [];
    // I want to have a X grid system not too big so if I have 40 point I want Max 5 Bar?
    // Axis min = 100, Axis Max = 400 --> Spacing = 300/5
    // let yearDifference = maximum / 5 * Spacing
    for (var i = 0; i <= 5; i++) {
      XAxisValue.push({
        x: 100 + (graphWidth - 100)/5*i,
        label: parseInt(maximum / 5 * i * 10)/10
      })
    }
    return XAxisValue;
  }
  getYAxisGrid(maximum) {
    let YAxisValue = [];
    // I want to have a X grid system not too big so if I have 40 height I want Max 5 Bar?
    // 0 being the bottom and Max being the top(so smallest number since we go down)
    // if graph height is 400 the 0 should be at the level of the X Axis so 370(graphHeight-yZero) but the graph will be from 0
    for (var i = 0; i <= 5; i++) {
      YAxisValue.push({
        y: 15 + (yZero - 15)/5*(5-i),
        label: parseInt(maximum / 5 * i * 10)/10
      });
    }
    console.log('YAxisValue: ',YAxisValue, maximum);
    return YAxisValue;
  }
  getInputLabels(labelArray) {
    return labelArray.map((arrX) => {
      console.log('Label List : ', arrX.label);
      return arrX.label;
    })
  }
  render() {
    const {arrayOfArray, maximum, labelList, axis, title, xAxisGrid, yAxisGrid} = this.state;
    return(<div>
      <br></br>
      <svg version="1.2" className={`${styles.graph}`} aria-labelledby="title" role="img">
        <title id="title">{title}</title>
        <g className={`${styles.grid} ${styles.x_grid}`} id="xGrid">
          <line x1="90" x2="90" y1="5" y2={yZero}></line>
        </g>
        <g className={`${styles.grid} ${styles.y_grid}`} id="yGrid">
          <line x1="90" x2="705" y1={yZero} y2={yZero}></line>
        </g>
          <g className={`${styles.labels} ${styles.x_labels}`}>
          {xAxisGrid.map((item) => { return (<text key={item.label} x={item.x} y={graphHeight}>{item.label}</text>) })}
          <text x={graphHeight} y={graphHeight + 40} className={`${styles.label_title}`}>{axis.x}</text>
        </g>
        <g className={`${styles.labels} ${styles.y_labels}`}>
          {yAxisGrid.map((item) => { return (<text key={item.label} x="80" y={item.y}>{item.label}</text>) })}
          <text x="50" y={graphHeight / 2} className={`${styles.label_title}`}>{axis.y}</text>
        </g>
      </svg>
      <h2>Success with {arrayOfArray.length}, {maximum}, {labelList[0]}</h2>
      {/* {arrayOfArray[0].map((dataSequence, index) => {
        return (<div key={index}>
          {dataSequence}
          </div>)
      })} */}

      </div>)
  }
}
