export const gradientsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        colors: action.payload
      }
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}