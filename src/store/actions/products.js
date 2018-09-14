import { constants } from "./constants";

export function fetchProducts() {
	return {
		type: constants.GET_PRODUCTS,
		payload: {
			request: {
				url: `/products`
			}
		}
	};
}
