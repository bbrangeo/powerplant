import {ADD_LOCATION, SET_LOCATIONS, LOGOUT} from '/client/actions/types';

export const defaultState = [];

export const locations = (state=defaultState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.locations;
    case ADD_LOCATION:
      return state.concat(action.location);
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}