import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { authStateChanged} from '../actions/social-signin-action';
import Login from './login';
import Home from './home';
import loadingGif from '../assets/loader.gif';
import { Route, BrowserRouter } from "react-router-dom";

class App extends Component {

    componentWillMount () {
        this.props.authStateChanged ();
    };
    
    render () {
        if (this.props.LOADING_STATE) 
            return (
                <div style = { styles.container }>
                    <img src = { loadingGif } height = "150px" width = "150px" />
                </div>
            )
        return (
            <BrowserRouter>
                <div>
                    { this.props.email ? <Route path="/" component = { Home }/> : <Route  path="/" component = { Login } /> }
                </div>
            </BrowserRouter>
        );
    };
}

const mapStateToProps = ({socialSignIn}) => {
    return socialSignIn;
}
const styles = {
    container: {
        top: '50%',
        left: '50%',
        width:'30em',
        height:'18em',
        marginTop: '-9em',
        marginLeft: '-15em',
    }
};

export default connect (mapStateToProps, { authStateChanged })(App);