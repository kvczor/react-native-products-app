import { constants } from '../actions/constants';

export default function reducer(state = { products: [] }, action) {
	switch (action.type) {
		case constants.GET_PRODUCTS:
			return { ...state, loading: true };
		case constants.GET_PRODUCTS_SUCCESS:
			return { ...state, loading: false, products: action.payload.data };
		case constants.GET_PRODUCTS_FAILURE:
			return {
				...state,
				loading: false,
				error: 'Error while loading products'
			};
		default:
			return state;
	}
}
