import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux';
import { addComment } from "../store/actions";

const styles = StyleSheet.create({
	scrollContainer: {
		backgroundColor: 'white'
	},
	container: {
		backgroundColor: 'white',
		paddingHorizontal: 16,
		paddingBottom: 16
	},
	subtitle: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#576170',
		marginBottom: 8
	},
	image: {
		height: 128,
		width: '100%',
		marginBottom: 16
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8
	},
	description: {
		fontSize: 12,
		marginBottom: 16
	},
	price: {
		fontSize: 16,
		marginBottom: 16
	},
	commentInputContainer: {
		borderColor: 'black',
		borderWidth: 1
	},
	commentInput: {
		height: 100
	},
	comment: {
		paddingLeft: 8,
		marginBottom: 4
	}
});

class ProductDetails extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});
	
	constructor(props) {
		super(props);
		this.state = {
			commentText: ''
		};
	}
	
	handleImagePress = (imageList, title) => () => {
		this.props.navigation.navigate('ProductGallery', { imageList, title })
	};
	
	handleSubmitComment = () => {
		this.props.addComment({id: this.props.navigation.state.params.id, commentText: this.state.commentText});
	};
	
	render() {
		const productId = this.props.navigation.state.params.id;
		const product = this.props.products.find(item => item.id === productId);
		const productComments = this.props.comments[productId] || [];
		
		const {
			title,
			description,
			specification,
			price,
			images
		} = product;
		
		return (
			<KeyboardAwareScrollView style={styles.scrollContainer}>
				<TouchableOpacity onPress={this.handleImagePress(images, title)}>
					<Image style={styles.image} source={{ uri: images[0].original }}/>
				</TouchableOpacity>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.price}>{price}$</Text>
					<Text style={styles.subtitle}>DESCRIPTION</Text>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.subtitle}>SPECIFICATION</Text>
					<Text style={styles.description}>{specification}</Text>
					
					<Text style={styles.subtitle}>COMMENTS</Text>
					{productComments.map((comment, index) => (<Text style={styles.comment} key={`${index}${comment}`}>{comment}</Text>))}
					
					<View style={styles.commentInputContainer}>
						<TextInput
							autoCorrect={false}
							style={styles.commentInput}
							value={this.state.comment}
							onChangeText={(commentText) => this.setState({commentText})}
							editable
							multiline
							numberOfLines={4}
							returnKeyType="send"
							blurOnSubmit
							onSubmitEditing={this.handleSubmitComment}
						/>
					</View>
					
					<Button
						title="Submit comment"
						onPress={this.handleSubmitComment}
					/>
					
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const mapStateToProps = ({ products, comments }) => ({ products, comments });

const mapDispatchToProps = {
	addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
