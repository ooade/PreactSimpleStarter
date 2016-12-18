import { h, Component } from 'preact';
import Helmet from 'react-helmet';

export default class Profile extends Component {
	render() {
		return (
			<div className='profile'>
				<Helmet title="Developed by" />
				<a href="http://github.com/ooade"> Ademola Adegbuyi </a>
			</div>
		);
	}
}
