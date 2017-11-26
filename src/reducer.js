const initialState = {
  appLoaded: false,
  endpoint: undefined,
  defaultDataset: {
    namedGraph: {
      name: undefined
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.payload
      };
    case 'APP_LOADED':
      return {
        ...state,
        appLoaded: action.payload
      };
    default:
      return state;
  }
}
