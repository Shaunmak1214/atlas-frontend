import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LOGOUT } from '../features/counter/authSlice';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.isAuthenticated;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token
});
  
const mapDispatchToProps = dispatch => {
    return {
      LOGOUT: () => dispatch(LOGOUT()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRoute);