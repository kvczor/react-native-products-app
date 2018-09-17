import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { fetchProducts, fetchComments } from '../store/actions/';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	item: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E4E4E4',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	description: {
		flex: 1,
		paddingLeft: 8
	},
	title: {
		fontWeight: 'bold'
	},
	image: {
		height: '100%',
		width: 64
	},
	spinnerContainer: {
		justifyContent: 'center',
		flex: 1
	}
});

class ProductList extends Component {
	static navigationOptions = {
		title: 'Products'
	};
	
	componentDidMount() {
		this.props.fetchProducts();
		this.props.fetchComments();
	}
	
	handleItemPress = (item) => () => {
		this.props.navigation.navigate('ProductDetails', { id: item.id, title: item.title })
	};
	
	renderItem = ({ item }) => (
		<TouchableOpacity onPress={this.handleItemPress(item)}>
			<View style={styles.item}>
					<Image style={styles.image} source={{uri: item.images[0].thumb}}/>
				<View style={styles.description}>
					<Text style={styles.title}>{item.title}</Text>
					<Text>{item.price}$</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
	
	render() {
		const { products, isLoading, isError } = this.props;
		
		if (isLoading) {
			return (
				<View style={styles.spinnerContainer}>
					<ActivityIndicator size="large"/>
				</View>
			);
		}
		
		if (isError) {
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
	const keyedProducts = state.products.map(product => ({ key: `${product.id}`, ...product }));
	return {
		products: keyedProducts,
		isLoading: state.isLoading,
		isError: state.isError
	};
};

const mapDispatchToProps = {
	fetchProducts,
	fetchComments
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
