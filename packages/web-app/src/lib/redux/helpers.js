export const createActionCreator = (type, ...argNames) =>
  (...args) => {
    const action = { type, payload: {} };
    argNames.forEach((arg, index) => {
      action.payload[argNames[index]] = args[index];
    });

    return action;
  };

export const createAPIActionTypes = ({ namespace = '', type }) => {
  const prefix = `${namespace ? `${namespace}/` : ''}${type.toUpperCase()}`;

  return [
    `${prefix}_REQUEST`,
    `${prefix}_SUCCESS`,
    `${prefix}_FAILURE`,
    `${prefix}_RESET`,
  ];
};

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const createReducerForAction = (actionType, initialState) =>
  (state = initialState, action) => {
    if (action.type === actionType) {
      return action.payload;
    }

    return state;
  };

const hasValidTypes = types =>
  Array.isArray(types) &&
  types.length === 4 &&
  types.every(type => typeof type === 'string');

export const createAPIReducerHandlers = types => {
  if (!hasValidTypes(types)) {
    throw new Error('Expected an array of three string types.');
  }

  return {
    // request
    [types[0]]: state => ({
      ...state,
      isFetching: true,
      error: null,
      response: null,
    }),

    // success
    [types[1]]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      response: payload,
      error: null,
    }),

    // failure
    [types[2]]: (state, { error }) => ({
      ...state,
      isFetching: false,
      error,
    }),

    // reset
    [types[3]]: () => ({
      isFetching: false,
      error: null,
      response: null,
    }),
  };
};

export const createAPIReducer = (initialState = {}, types) =>
  createReducer(
    {
      isFetching: false,
      error: null,
      response: null,
      ...initialState,
    },
    createAPIReducerHandlers(types)
  );
