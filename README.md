1. run `yarn` to install dependencies
2. run `yarn run ios` or `yarn run android` to run the app on a device

### What was done:
- clean and scalable structure
- tech stach: react-native, redux, react-navigation, react-native-image-gallery (fork which fixed an issue in the original repo was used), axios, redux-axios-middleware (speeds up work with axios)
- basic styling
- loading and error state handling when fetching product list
- ability to add comments to each product. comments persist in AsyncStorage and are rehydrated during inital app load
- ability to use image gallery in product details view

### What could be improved in the future
- styles that are repeated could be moved to styles/sharedStyles.js and used across the project
- error handling for comment fetching could be improved (it's using console.log now)
- if app was fetching comments from a real API then checking current state of all comments would not be necessary before
submitting one
- adding unit tests for components, actions and reducers
- relaying on more stable gallery solution
- I wanted to show that I know how to use async/await, but I think that code using promises would be cleaner
