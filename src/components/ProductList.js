import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';

import { listProducts } from '../store/actions/';

class ProductList extends Component {
	componentDidMount() {
		this.props.listProducts();
	}
	
	renderItem = ({ item }) => (
		<View>
			<Text>{item.title}</Text>
			<Text>{item.price}</Text>
			<Image source={{uri: item.images[0].thumb}}/>
		</View>
	);
	
	render() {
		const { products } = this.props;
		return (
			<FlatList
				data={products}
				renderItem={this.renderItem}
			/>
		);
	}
}

const mapStateToProps = state => {
	let keyedProducts = state.products.map(product => ({ key: `${product.id}`, ...product }));
	return {
		products: keyedProducts
	};
};

const mapDispatchToProps = {
	listProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
