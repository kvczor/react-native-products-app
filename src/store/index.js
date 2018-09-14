import axiosMiddleware from "redux-axios-middleware";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import axios from 'axios';

const client = axios.create({
	baseURL:'http://private-5815fe-recommendationsknip.apiary-mock.com',
	responseType: 'json'
});

const store = createStore(
	rootReducer,
	applyMiddleware(
		axiosMiddleware(client)
	)
);

export default store;
