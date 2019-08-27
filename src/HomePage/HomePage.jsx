import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const {user, users} = this.props;
        return (
            <div >
                <h3 data-test="message">Hello {user.firstName} {user.lastName}, Good to see you!</h3>
                <p>All registered users:</p>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id} data-test="user">
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ?
                                    <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)} id="delete">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/login" data-test="logout">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const {users, authentication} = state;
    const {user} = authentication;
    return {user, users};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};