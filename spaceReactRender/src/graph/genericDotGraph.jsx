import React from 'react';

// import GraphBar from './graphBar.jsx'
import styles from './lineGraph.scss';

// EXEMPLE of input:
// var imputArray = [
//   [5,6,7,12],
//   [5,2,10,2],
//   [5,20,7,12]
// ];
// var labelArray = [{label:'Item 1 to display', max:12, color:'red'}, {label:'Item 2 to display', max:10, color:'blue'}, {label:'Item 3 to display', max:20, color:'pink'}]
var svgHeight = 500;
var svgWidth = 900;
var xPadding = 100;
var yToppadding = 50;
var LabelsWidth = 150;
var graphWidth = svgWidth - xPadding - LabelsWidth; //padding needed for Label
var graphHeight = svgHeight - 100; //padding needed
var yZero = graphHeight - 30; //padding needed for Text

export default class GenericBarGraph extends React.Component {
  // This is the Graph itself.
  getCoordonateOfData(imputArray) {
    let maximumIteration = imputArray[0].length; // SO we have the same Maximum as the xAxisGrid
    maximumIteration = (maximumIteration % 2 !== 0) ? maximumIteration++ : maximumIteration; // Avoid odd and Prime numbers.
    let MaxValue = this.getInputmax(imputArray);
    return imputArray.map((subArrayOfData) =>{
      return subArrayOfData.map((point, index) => {
        // Remember yZero Start at a higher value so we substract the coordonate to it.
        return {
          cx: xPadding + index * (graphWidth - xPadding)/maximumIteration,
          cy: yZero - point/MaxValue*(yZero - yToppadding),
          value:point
        };
      });
    });
  }
  getInputmax(imputArray) {
      var max = 0;
      let arrOfMax = imputArray.map((arrX) => {
        let currentMax = Math.max(...arrX);
        if (currentMax > max) {max = currentMax;}
      });
      // Avoid odd and Prime numbers.
      if (max % 2 !== 0) {max++;}
      return max;
  }
  getXAxisGrid(maximum) {
    let evenMax = (maximum % 2 !== 0) ? maximum + 1 : maximum; // Avoid odd and Prime numbers. (link with getCoordonateOfData)
    let nbrLoop = this.findBiggestModal(evenMax, 20, 5);
    let XAxisValue = [];
    // I want to have a X grid system not too big so if I have 40 point I want Max 5 Bar?
    // Axis min = 100, Axis Max = 400 --> Spacing = 300/5
    // let yearDifference = maximum / 5 * Spacing
    for (var i = 0; i <= nbrLoop; i++) {
      XAxisValue.push({
        x: xPadding + (graphWidth - xPadding)/nbrLoop*i,
        label: parseInt(evenMax / nbrLoop * i * 10)/10
      });
    }
    return XAxisValue;
  }
  findBiggestModal (nbr, max, min) {
    for (var i = Math.min(nbr, max); i > 0; i--) {
      if (nbr % (i - 1) === 0) {
        return (i-1);
      }
      if (i <= min) {
        return i; // Grah with 1 Line is crude. :| so we add a minimum even if it will be with fraction.
      }
    }
    return 1; //To avoid receiving a 0 (and crashing?);
  }
  getYAxisGrid(maximum) {
    let YAxisValue = [];
    let nbrLoop = this.findBiggestModal(maximum, 10, 2);

    // I want to have a Y grid system not too big so if I have 40 height I want Max 5 Bar?
    // 0 being the bottom and Max being the top(so smallest number since we go down)
    // if graph height is 400 the 0 should be at the level of the X Axis so 370(graphHeight-yZero) but the graph will be from 0
    for (var i = 0; i <= nbrLoop; i++) {
      YAxisValue.push({
        y: yToppadding + (yZero - yToppadding)/nbrLoop*(nbrLoop-i),
        label: parseInt(maximum / nbrLoop * i *10)/10
      });
    }
    // console.log('YAxisValue: ',YAxisValue, maximum);
    return YAxisValue;
  }
  render() {
    const arrayOfArray = this.getCoordonateOfData(this.props.imputArray);
    const xAxisGrid = this.getXAxisGrid(this.props.imputArray[0].length);
    const yAxisGrid = this.getYAxisGrid(this.getInputmax(this.props.imputArray));
    const axis = {
      x: this.props.xaxis,
      y: this.props.yaxis
    };
    const {labelArray, title} = this.props;
    return(<div>
      <br></br>
      <svg version="1.2" className={`${styles.graph}`} style={{height: svgHeight+'px', width: svgWidth+'px'}} aria-labelledby="title" role="img">
        <text x={xPadding + graphWidth/3} y={yToppadding/2} id="title" className={`${styles.label_title}`}>{title}</text>
        <g className={`${styles.grid} ${styles.x_grid}`} id="xGrid">
          <line x1="90" x2="90" y1={yToppadding - 5} y2={yZero}></line>
        </g>
        <g className={`${styles.grid} ${styles.y_grid}`} id="yGrid">
          <line x1="90" x2={graphWidth} y1={yZero} y2={yZero}></line>
        </g>
        <g className={`${styles.labels} ${styles.x_labels}`}>
          {xAxisGrid.map((item) => { return (<text key={item.label} x={item.x} y={graphHeight}>{item.label}</text>); })}
          <text x={(graphWidth+ xPadding) / 2} y={graphHeight + 40} className={`${styles.label_title}`}>{axis.x}</text>
        </g>
        <g className={`${styles.labels} ${styles.y_labels}`}>
          {yAxisGrid.map((item) => { return (<g key={item.label}>
            <text x="80" y={item.y}>{item.label}</text>
            <line className={`${styles.grid} ${styles.x_grid}`} x1="90" x2={graphWidth} y1={item.y} y2={item.y}></line>
          </g>
          ); })}
          <svg x="30" y={graphHeight / 2} width="100" height="100">
            <text dominantBaseline="text-before-edge" transform="rotate(-90)" className={`${styles.label_title}`}>{axis.y}</text>
          </svg>
        </g>
        {arrayOfArray.map((dataSet, i) => {
          return(<g key={i} style={{fill: labelArray[i].color, strokeWidth: 1}} data-setname={labelArray[i].label}>
            {dataSet.map((item, index) =>{
              return (<g key={item.cx + item.cy} className={`${styles.graph_dot}`}>
                <circle cx={item.cx} cy={item.cy} data-value={item.value} r="4"></circle>
                <text id="tooltip" x={item.cx} y={item.cy} visibility='hidden' className={`${styles.tooltip}`}>({index}, {item.value})</text>
              </g>);
            })}
          </g>
          );
        })}
        {labelArray.map((item, index) => {
          return(<text key={index} x={graphWidth + 10} y={svgHeight / 3 + 20*index} style={{fill: item.color}} className={`${styles.label_title}`}>{item.label}</text>);
        })}

      </svg>
    </div>);
  }
}
