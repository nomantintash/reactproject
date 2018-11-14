import { USER_LOGIN_FAILED, USER_LOGIN_SUCCESSFUL, USER_LOGGED_OUT, SHOW_LOADING_STATE } from '../actions/social-signin-action';

let INITIALSTATE = {
    'email': '',
    'photoURL': '',
    'displayName': '',
    'uid': '',
    'LOADING_STATE': true,
    'AUTHENTICATED': false
};

export default function (state = {}, action) {
    switch (action.type) {
        
        case USER_LOGIN_SUCCESSFUL:
            INITIALSTATE = action.payload;
            INITIALSTATE.LOADING_STATE = false;
            INITIALSTATE.AUTHENTICATED = true;
            state = { ...INITIALSTATE };
            return state;
        
        case USER_LOGIN_FAILED:
            INITIALSTATE.error  = action.payload;
            state = { ...INITIALSTATE };
            return state;
            
        case USER_LOGGED_OUT:
            INITIALSTATE = {
                'email': '',
                'photoURL': '',
                'displayName': '',
                'uid': '',
                'LOADING_STATE': false
            };
            state = { ...INITIALSTATE };
            return state;
        
        case SHOW_LOADING_STATE:
            state = { ...INITIALSTATE };
            return state;
            
        default:
            return state;
    }
};