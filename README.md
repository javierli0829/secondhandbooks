# The usage of backend API:

Go to the project root directory, run the following:<br />

`cd backend`<br />
`python manage.py runserver`<br />

There are many ways to use this API, as long as you can send and receive JSON data following HTTP RESTful standard. 

## You can use our browsable API:
open http://localhost:8000<br />

Note: this browsable API can only handle GET and POST requests. <br />

Example usage: <br />

### 1. View all books in the database (GET)
In your browser address bar, type http://localhost:8000/book/ <br /><br />

### 2. Post a new book (POST)
step 1: In your browser address bar, type http://localhost:8000/book/ <br /><br />
step 2: Simply use the form on the web page to submit a new book <br />
Note: The id of the book is automatically generated, so you don't need to create it<br /><br />

### 3. Get a book by id (GET)
In your browser address bar, type http://localhost:8000/book/&ltid&gt <br /><br />

### 4. Get a book by name (GET)
In your browser address bar, type http://localhost:8000/book/?name=bookname <br />
You can also get a book by author, category and other fields in the same manner.<br /><br />

### 5. Search a book by keywords in the description (GET)
For example, if you want to search a book whose description contains 'science', please go http://localhost:8000/book/ and click the 'Filters' icon on the page. Then use the search function. <br /><br />

## If you want to update and delete data, you can use other ways to send http requests from the :

### 6. Delete a book (DELETE)
For example. you can issue a DELETE request to the following url
http://127.0.0.1:8000/book/?name=bookname <br /><br />

### 7. When a new user become interested in a book  (PATCH)
In this case, you should send a PATCH request to update the 'peopleInterested' field of the book.
step 1: Get the book's 'peopleInterested' that you will update. For example, the current list is [1,2] <br />
step 2: Issue a PATCH request with the updated list. For example, you want to add a new user to book 1 whose ID is 3, then issue: http PATCH http://127.0.0.1:8000/book/1/ peopleInterested:='[1,2,3]' <br /><br />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
