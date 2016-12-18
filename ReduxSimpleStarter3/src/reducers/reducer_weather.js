import {FETCH_WEATHER} from '../actions/index';

export default function(state = [], action){
  switch (action.type){
    case FETCH_WEATHER:
    // not mutating state, returning a new version of our state
      // return state.concat([action.payload.data]);

      //almost identical to concat
      //inserts action.payload.data to the front of array
      //[city, city, city] NOT [city, [city, city]]
      return [action.payload.data, ...state];
  }


  return state;
}
