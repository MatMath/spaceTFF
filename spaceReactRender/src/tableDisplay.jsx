import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import tableStyle from './tableStyle.scss'

export default class TableDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth
    }
  }
  render () {
    const { resultOfgrowth } = this.state;
    return (
      <div>

          <div className={tableStyle.table_header}>
              <div className='col-xs-1'> Trip</div>
              <div className='col-xs-2'> Mars Pop</div>
              <div className='col-xs-2'> Earth Fleet</div>
              <div className='col-xs-2'> Mars fleet</div>
              <div className='col-xs-1'> ShipLoss</div>
              <div className='col-xs-2'> Death</div>
              <div className='col-xs-2'> Total Death</div>

          </div>
          <div className={tableStyle.fix_table_container}>
            {resultOfgrowth.map((trip, i) => {
              return (<div className={`row ${tableStyle.rowcolor}`} key={i}>
                <div className='col-xs-1'>{ i }</div>
                <div className='col-xs-2'>{ trip.martian }</div>
                <div className='col-xs-2'>{ trip.earthFleet.length }</div>
                <div className='col-xs-2'>{ trip.marsFleet.length }</div>
                <div className='col-xs-1'>{ trip.shipLoss }</div>
                <div className='col-xs-2'>
                  <ul>
                    {trip.totKilledIn.earthTakeOff > 0 && <li>Earth TakeOff: { trip.totKilledIn.earthTakeOff }</li>}
                    {trip.totKilledIn.marsTakeOff > 0 && <li>Mars TakeOff: { trip.totKilledIn.marsTakeOff }</li>}

                    {trip.totKilledIn.journeyToEarth > 0 && <li>Journey To Earth: { trip.totKilledIn.journeyToEarth }</li>}
                    {trip.totKilledIn.journeyToMars > 0 && <li>Journey To Mars: { trip.totKilledIn.journeyToMars }</li>}

                    {trip.totKilledIn.landingEarth > 0 && <li>Earth landing: { trip.totKilledIn.landingEarth }</li>}
                    {trip.totKilledIn.landingMars > 0 && <li>Mars landing: { trip.totKilledIn.landingMars }</li>}

                    {trip.totKilledIn.refueling > 0 && <li>Refueling: { trip.totKilledIn.refueling }</li>}
                  </ul>
                </div>
                <div className='col-xs-2'>{ trip.cummulativeLife }</div>
              </div>)
            })}
          </div>


      <h1>nbr of steps: {resultOfgrowth.length}</h1>


      </div>
    )
  };
};
