import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

import ProductList from './src/components/ProductList';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View>
					<ProductList/>
				</View>
			</Provider>
		);
	}
};

