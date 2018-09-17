import { constants } from "./constants";
import { AsyncStorage } from 'react-native';

export const fetchProducts = () => {
	return {
		type: constants.GET_PRODUCTS,
		payload: {
			request: {
				url: `/products`
			}
		}
	};
};

export const fetchComments = () => {
	return async dispatch => {
		try {
			const comments = JSON.parse(await AsyncStorage.getItem('comments')) || [];
			Object.keys(comments).forEach(key => {
				dispatch(rehydrateComments({
					id: key,
					commentList: comments[key]
				}));
			});
		} catch (error) {
			console.log(error)
		}
	};
};

export const rehydrateComments = ({ id, commentList }) => {
	return {
		type: constants.REHYDRATE_COMMENTS,
		payload: {
			id,
			commentList
		}
	};
};

export const addCommentToStore = ({ id, commentText }) => {
	return {
		type: constants.ADD_PRODUCT_COMMENT,
		payload: {
			id,
			commentText
		}
	};
};

export const addComment = ({ id, commentText }) => {
	return async dispatch => {
		let response;
		try {
			response = await AsyncStorage.getItem('comments');
		} catch (error) {
			console.log(error);
		}
		
		const currentStorageState = JSON.parse(response) || {};
		const updatedCommentList = currentStorageState[id] ? [...currentStorageState[id], commentText] : [commentText];
		const comments = { ...currentStorageState, [id]: updatedCommentList };
		await AsyncStorage.setItem('comments', JSON.stringify(comments));
		dispatch(addCommentToStore({ id, commentText }))
		
	};
};
