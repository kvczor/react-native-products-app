import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { listProducts } from '../store/actions/';
import reducer from "../store/reducers/products";


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	product: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E4E4E4'
	},
	image: {
		height: 100,
		width: 100
	}
});

class ProductList extends Component {
	componentDidMount() {
		this.props.listProducts();
	}
	
	renderItem = ({ item }) => (
		<View style={styles.product}>
				<Image style={styles.image} source={{uri: item.images[0].thumb}}/>
				<Text>{item.title}</Text>
				<Text>{item.price}</Text>
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
