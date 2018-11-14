import { combineReducers } from 'redux';
import socialSignIn from './signin_reducer';
import mediaReducer from './media-reducer';
const rootReducer = combineReducers({
    socialSignIn,
    mediaReducer
});
export default rootReducer;