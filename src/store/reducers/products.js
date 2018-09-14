import { constants } from '../actions/constants';

export default function reducer(state = { products: [] }, action) {
	switch (action.type) {
		case constants.GET_PRODUCTS:
			return {
				...state,
				isLoading: true
			};
		case constants.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				products: action.payload.data
			};
		case constants.GET_PRODUCTS_FAIL:
			return {
				...state,
				isLoading: false,
				isError: true
			};
		default:
			return state;
	}
}
