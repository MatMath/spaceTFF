import React from 'react'

import GraphBar from './graphBar.jsx'
import styles from './lineGraph.scss'

// EXEMPLE of input:
// var imputArray = [
//   [5,6,7,12],
//   [5,2,10,2],
//   [5,20,7,12]
// ];
// var labelArray = [{label:'Item 1 to display', max:12, color:'red'}, {label:'Item 2 to display', max:10, color:'blue'}, {label:'Item 3 to display', max:20, color:'pink'}]
var svgHeight = 600;
var svgWidth = 800;
var xPadding = 100;
var yToppadding = 15;
var graphWidth = svgWidth - xPadding; //padding needed for Label
var graphHeight = svgHeight - 100; //padding needed
var yZero = graphHeight - 30; //padding needed for Text

export default class GenericBarGraph extends React.Component {
  // This is the Graph itself.
  constructor (props) {
    super(props);
    this.state = {
      arrayOfArray: this.getCoordonateOfData(this.props.imputArray),
      maximum: this.getInputmax(this.props.imputArray),
      labelArray: this.props.labelArray,
      xAxisGrid: this.getXAxisGrid(this.props.imputArray[0].length),
      yAxisGrid: this.getYAxisGrid(this.getInputmax(this.props.imputArray)),
      axis:{
        x: this.props.xaxis,
        y: this.props.yaxis
      },
      title: this.props.title
    }
  }
  getCoordonateOfData(imputArray) {
    console.log('getCoordonateOfData:', imputArray);
    let maximumIteration = imputArray[0].length; // SO we have the same Maximum as the xAxisGrid
    let MaxValue = this.getInputmax(imputArray);
    return imputArray.map((subArrayOfData) =>{
      return subArrayOfData.map((point, index) => {
        // Remember yZero Start at a higher value so we substract the coordonate to it.
        return {
          cx: xPadding + index * (graphWidth - xPadding)/maximumIteration,
          cy: yZero - point/MaxValue*(yZero - yToppadding),
          value:point
        }
      })
    })
  }
  getInputmax(imputArray) {
    console.log('GetInputMax:', imputArray);
      var max = 0;
      let arrOfMax = imputArray.map((arrX) => {
        // console.log('max : ', arrX, arrX.max);
        console.log('Before Max', arrX);
        let currentMax = Math.max(...arrX);
        console.log('currentMax:',currentMax);
        if (currentMax > max) {max = currentMax;}
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
        x: xPadding + (graphWidth - xPadding)/5*i,
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
        y: yToppadding + (yZero - yToppadding)/5*(5-i),
        label: parseInt(maximum / 5 * i * 10)/10
      });
    }
    // console.log('YAxisValue: ',YAxisValue, maximum);
    return YAxisValue;
  }
  render() {
    const {arrayOfArray, maximum, labelArray, axis, title, xAxisGrid, yAxisGrid} = this.state;
    return(<div>
      <br></br>
      <svg version="1.2" className={`${styles.graph}`} style={{height: svgHeight+'px', width: svgWidth+'px'}} aria-labelledby="title" role="img">
        <title id="title">{title}</title>
        <g className={`${styles.grid} ${styles.x_grid}`} id="xGrid">
          <line x1="90" x2="90" y1="5" y2={yZero}></line>
        </g>
        <g className={`${styles.grid} ${styles.y_grid}`} id="yGrid">
          <line x1="90" x2={graphWidth} y1={yZero} y2={yZero}></line>
        </g>
          <g className={`${styles.labels} ${styles.x_labels}`}>
          {xAxisGrid.map((item) => { return (<text key={item.label} x={item.x} y={graphHeight}>{item.label}</text>) })}
          <text x={graphHeight} y={graphHeight + 40} className={`${styles.label_title}`}>{axis.x}</text>
        </g>
        <g className={`${styles.labels} ${styles.y_labels}`}>
          {yAxisGrid.map((item) => { return (<text key={item.label} x="80" y={item.y}>{item.label}</text>) })}
          <text x="50" y={graphHeight / 2} className={`${styles.label_title}`}>{axis.y}</text>
        </g>
        {arrayOfArray.map((dataSet, i) => {
          return(<g key={i} style={{fill: labelArray[i].color, strokeWidth: 1}} data-setname={labelArray[i].label}>
              {dataSet.map((item, index) =>{
                return (<circle key={item.cx + item.cy} cx={item.cx} cy={item.cy} data-value={item.value} r="4"></circle>)
              })}
            </g>
          )
        })}
      </svg>
    </div>)
  }
}
