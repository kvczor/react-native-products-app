import { constants } from '../actions/constants';

export default (state = { products: [], comments: {} }, action) => {
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
		case constants.ADD_PRODUCT_COMMENT:
			const commentsList = [...state.comments[action.payload.id] || [], action.payload.commentText];
			
			return {
				...state,
				comments: {
					...state.comments,
					[action.payload.id]: commentsList
				}
			};
		case constants.REHYDRATE_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					[action.payload.id]: action.payload.commentList
				}
			};
		default:
			return state;
	}
}

