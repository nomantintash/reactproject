import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { signout } from '../actions/social-signin-action';
import { connect } from 'react-redux';
const Menu = [
    {route: "/", name: "Home"},
    {route:"/home/upload", name: "Upload Media"},
    {route: "/home/my-videos", name: "My Videos"}
];

class SideBar extends Component {
    renderMenu () {
        const menu = Menu.map(menu => {
            return (
                <div key = {menu.name}>
                    <Button  fullWidth = {true} className={this.props.classes.button} key = {menu.name}>
                    <Link to={menu.route} >
                        <div style = {styles.menuColor}> {menu.name}</div>
                    </Link>
                    </Button>  
                </div>
            );
        });
        return menu;
    }
    logout = () => {
        this.props.signout();
    }
    render () {
        return (
            <div style = {styles.container} >

                <img src = { this.props.user.photoURL } style = {styles.profilepic}/>
                <p>{this.props.user.displayName}</p>
                <div style = { styles.menu }>
                { this.renderMenu() }
                </div>
                
                <Button fullWidth = {true} onClick = { this.logout } style = {styles.logout}>Logout</Button>
            </div>
        );
    };
};

function mapStateToProps({socialSignIn}) {
    return {
        user: socialSignIn
    };
}
const styles = {
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px'
    },
    menuColor: {
        color: '#3DB4B4',
    },
    menu:{
        marginTop: '20px'
    },
    logout: {
        color: '#B43D53'
    },
    profilepic: {
        marginTop: '20px',
        marginBottom: '15px',
        width: '60px',
        height: '60px',
        borderRadius: '50%'
    }
};

export default withStyles (styles)(connect(mapStateToProps, { signout })(SideBar));