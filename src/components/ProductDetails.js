import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	image: {
		height: 20,
		width: '100%'
	}
});

class RepoDetail extends Component {
	static navigationOptions = {
		title: 'Product Details'
	};
	
	render() {
		const productId = this.props.navigation.state.params.id;
		
		const {
			title,
			description,
			specification,
			price,
			images
		} = this.props.products.find(item => item.id === productId);
		
		return (
			<View>
				<Text>{title}</Text>
				<Text>{description}</Text>
				<Text>{specification}</Text>
				<Text>{price}</Text>
				{images.map((image, index) => {
					return (
						<Image key={`productImage-${index}`} style={styles.image} source={{ uri: image.original }}/>
					);
				})}
			</View>
		);
	}
}

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(RepoDetail);
