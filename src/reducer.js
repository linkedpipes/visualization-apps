const initialState = {
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
      console.log('setting config');
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
