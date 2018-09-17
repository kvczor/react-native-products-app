import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import Gallery from 'react-native-image-gallery';

const styles = StyleSheet.create({
	gallery: {
		flex: 1,
		backgroundColor: 'black'
	}
});

class ProductGallery extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});
	
	render() {
		const { imageList } = this.props.navigation.state.params;
		const galleryImages = imageList.map(image => ({
			source: {
				uri: image.original
			}
		}));
		
		return (
			<Gallery
				style={styles.gallery}
				images={galleryImages}
			/>
		);
	}
}

export default ProductGallery;
