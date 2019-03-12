import React from 'react';

export default class Header extends React.Component{

	render(){
		return(
			<header>
				<nav className="navbar navbar-light bg-primary justify-content-between">
					<a className="navbar-brand">NorteLink</a>
					<form className="navbar-left navbar-form nav-search" action="">
						<div className="input-group">
							<input type="text" placeholder="Search ..." className="form-control" />
							<div className="input-group-append">
								<span className="input-group-text">
									<i className="fa fa-search search-icon"></i>
								</span>
							</div>
						</div>
					</form>
				</nav>
			</header>
		)
	}
}