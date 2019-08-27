import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class Menu extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Welcome page</h2>
                <div className="form-group">
                    <Link to="/login" className="btn btn-link" id="loginButton">Login</Link>
                    <br />
                    <Link to="/register" className="btn btn-link" id="registerButton">Register</Link>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {loggingIn} = state.authentication;
    return {loggingIn};
}

const actionCreators = {
    logout: userActions.logout
};

const connectedMenu = connect(mapState, actionCreators)(Menu);
export {connectedMenu as Menu};