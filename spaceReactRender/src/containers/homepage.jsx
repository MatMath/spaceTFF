import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
	constructor (props) {
    super(props);
  }
	render() {
		return (
			<div>
        <Link to={'/mars'}>Population projection </Link>
        <hr />
        <Link to={'/cost'}>Cost projection </Link>
			</div>
		);
	}
}

export default HomePage;
