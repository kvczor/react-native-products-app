import { constants } from "./constants";

export function listProducts() {
	return {
		type: constants.GET_PRODUCTS,
		payload: {
			request: {
				url: `/products`
			}
		}
	};
}
