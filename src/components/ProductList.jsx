import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { listProducts } from '../store/actions/';

class ProductList extends Component {
	componentDidMount() {
		this.props.listProducts();
	}
	
	renderItem = ({ product }) => (
		<View style={product}>
			<Text>{product.title}</Text>
			<Text>{product.price}</Text>
			<Image source={require(product.images[0].thumb)}/>
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

const mapStateToProps = state => ({
	products: state.products
});

const mapDispatchToProps = {
	listProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
