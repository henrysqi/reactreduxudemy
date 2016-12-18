import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';
// grab reducer from redux-form and create variable with it called formReducer
// to avoid naming conflicts
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
