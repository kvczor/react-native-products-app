import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { createStackNavigator } from 'react-navigation';

import ProductList from './src/components/ProductList';
import ProductDetails from './src/components/ProductDetails';
import ProductGallery from './src/components/ProductGallery';

const RootStack = createStackNavigator(
	{
		Home: ProductList,
		ProductDetails: ProductDetails,
		ProductGallery: ProductGallery
	},
	{
		initialRouteName: 'Home',
	}
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
					<RootStack/>
			</Provider>
		);
	}
}
