import axiosMiddleware from "redux-axios-middleware";
import { applyMiddleware, createStore, compose } from "redux";
import products from './reducers/products';
import thunk from 'redux-thunk';
import axios from 'axios';

const client = axios.create({
	baseURL:'http://private-5815fe-recommendationsknip.apiary-mock.com',
	responseType: 'json'
});

const middleware = [axiosMiddleware(client), thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	products,
	composeEnhancers(applyMiddleware(...middleware))
);

export default store;
