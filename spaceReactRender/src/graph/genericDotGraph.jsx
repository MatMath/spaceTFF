import React from 'react'

import GraphBar from './graphBar.jsx'
import styles from './lineGraph.scss'

var imputArray = [
  [5,6,7,12],
  [5,2,10,2],
  [5,20,7,12]
];
var labelArray = [{label:'Item 1 to display', max:12}, {label:'Item 2 to display', max:10}, {label:'Item 3 to display', max:20}]
export default class GenericBarGraph extends React.Component {
  // This is the Graph itself.
  constructor (props) {
    super(props);
    this.state = {
      arrayOfArray: imputArray,
      maximum: this.getInputmax(labelArray),
      labelList: this.getInputLabels(labelArray),
      axis:{
        x: 'Year',
        y: 'Prices'
      }
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
  getInputLabels(labelArray) {
    return labelArray.map((arrX) => {
      console.log('Label List : ', arrX.label);
      return arrX.label;
    })
  }
  render() {
    const {arrayOfArray, maximum, labelList} = this.state;
    return(<div>
      <svg version="1.2" className={`${styles.graph}`} aria-labelledby="title" role="img">
        <title id="title">A line chart showing some information</title>
        <g className={`${styles.grid} ${styles.x_grid}`} id="xGrid">
          <line x1="90" x2="90" y1="5" y2="371"></line>
        </g>
        <g className={`${styles.grid} ${styles.y_grid}`} id="yGrid">
          <line x1="90" x2="705" y1="370" y2="370"></line>
        </g>
          <g className={`${styles.labels} ${styles.x_labels}`}>
          <text x="100" y="400">2008</text>
          <text x="246" y="400">2009</text>
          <text x="392" y="400">2010</text>
          <text x="538" y="400">2011</text>
          <text x="684" y="400">2012</text>
          <text x="400" y="440" className={`${styles.label_title}`}>Year</text>
        </g>
        <g className={`${styles.labels} ${styles.y_labels}`}>
          <text x="80" y="15">15</text>
          <text x="80" y="131">10</text>
          <text x="80" y="248">5</text>
          <text x="80" y="373">0</text>
          <text x="50" y="200" className={`${styles.label_title}`}>Price</text>
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
