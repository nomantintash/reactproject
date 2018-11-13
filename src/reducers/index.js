import { combineReducers } from 'redux';
import socialSignIn from './signin_reducer';
const rootReducer = combineReducers({
    socialSignIn
});
export default rootReducer;