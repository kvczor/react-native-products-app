import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { fetchProducts } from '../store/actions/';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	product: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E4E4E4'
	},
	image: {
		height: 100,
		width: 100
	},
	loading: {
		color: 'red',
		marginTop: 50
	}
});

class ProductList extends Component {
	static navigationOptions = {
		title: 'Products'
	};
	
	componentDidMount() {
		this.props.fetchProducts();
	}
	
	handleItemClick = (item) => () => {
		this.props.navigation.navigate('ProductDetails', { id: item.id })
	};
	
	renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.item}
			onPress={this.handleItemClick(item)}
		>
			<View style={styles.product}>
					<Image style={styles.image} source={{uri: item.images[0].thumb}}/>
					<Text>{item.title}</Text>
					<Text>{item.price}</Text>
			</View>
		</TouchableOpacity>
	);
	
	render() {
		const { products } = this.props;
		
		if (this.props.isLoading) {
			return (
				<Text>Loading...</Text>
			)
		}
		
		if (this.props.isError) {
			return (
				<Text>An error occurred when loading products.</Text>
			)
		}
		
		return (
			<View style={styles.container}>
				<FlatList
					data={products}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	let keyedProducts = state.products.map(product => ({ key: `${product.id}`, ...product }));
	return {
		products: keyedProducts,
		isLoading: state.isLoading,
		isError: state.isError
	};
};

const mapDispatchToProps = {
	fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
