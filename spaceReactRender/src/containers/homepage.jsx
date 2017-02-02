import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
	render() {
		return (
			<div>
        <Link to="/mars">Population projection</Link>
        <Link to="/cost">Cost projection</Link>
        {this.props.children}
			</div>
		);
	}
}

export default HomePage;
