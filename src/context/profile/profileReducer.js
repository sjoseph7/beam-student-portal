import { PROFILE_LOADED, NO_PROFILE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case PROFILE_LOADED: {
      return {
        ...state,
        loadingProfile: false,
        profile: action.payload
      };
    }
    case NO_PROFILE: {
      return {
        ...state,
        loadingProfile: false,
        profile: null
      };
    }
    default: {
      return state;
    }
  }
};
