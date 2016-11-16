import React from 'react'

import GraphBar from './graphBar.jsx'
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
      labelList: this.getInputLabels(labelArray)
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
      <h2>Success with {arrayOfArray.length}, {maximum}, {labelList[0]}</h2>
      {arrayOfArray[0].map((dataSequence) => {
        return (<div>
          {dataSequence}
          </div>)
      })}
      </div>)
  }
}
