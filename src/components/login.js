import React, { Component } from "react";
import { connect } from "react-redux";
import { socialSignIn, authStateChanged } from "../actions/social-signin-action";
import googleIcon from '../assets/icon-google.png'
class Login extends Component {

  socialSigninHandler = event => {
    
    const signInType = event.target.name;
    switch (signInType) {
      case "facebook":
        this.props.socialSignIn (signInType);
        break;
      case "google":
        this.props.socialSignIn (signInType);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="limiter">
		  <div className="container-login100">
			<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
					<span className="login100-form-title p-b-53">
						Sign In With
					</span>

					<button  className="btn-face m-b-20 login100-form-btn" name ="facebook" onClick = { this.socialSigninHandler }>
						<div><i className="fab fa-facebook-square"></i></div>
            <div>Facebook</div>
					</button>

					<button className="btn-google m-b-20 login100-form-btn flex" name="google" onClick = { this.socialSigninHandler }>
						<div>
            <img src= { googleIcon } alt="GOOGLE"/>
            </div>
						Google
					</button>
			</div>
		  </div>
	    </div>
    );
  }
};

export default connect (null, { socialSignIn, authStateChanged })(Login);
