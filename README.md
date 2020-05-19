# Backend

## 10/05/2020 Update: Add celery to send email asynchronously
start command in another shell: 
<br />
$ celery -A bookExchange worker -l info

## 09/05/2020 Update: Add match function
User with id 'personId' is interested in a book with 'bookId' <br />
request url: http://127.0.0.1:8000/personId/bookId<br />

For example, user 1 has book 1,2,3 and interested in book 4; user 2 has book 4 and interested in books 1,3,5;<br />
request url: http://127.0.0.1:8000/1/4<br />
response content: {<br />
    "booksOwner": 2 <br />
    "matchedBooks": [1,3] <br />
}<br />


## 06/05/2020 Update: Add chatroom function
### Please install some package:
`$ brew install redis`<br />
`$ brew services start redis`<br />
`$ pip install -r requirements.txt`<br />
### The chatroom use websocket to build persistant connection

# #The usage of backend API:

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
Note: The id of the book is automatically generated, so you don't need to create it<br />
#### Note: The 'booksOwned' field of the user will be updated automatically according to the 'owner' field of this book, so you don't need to update it<br /><br />

### 3. Get a book by id (GET)
In your browser address bar, type http://localhost:8000/book/id <br /><br />

### 4. Get a book by name (GET)
In your browser address bar, type http://localhost:8000/book/?name=bookname <br />
You can also get a book by author, category and other fields in the same manner.<br /><br />

### 5. Search a book by keywords in the description (GET)
For example, if you want to search a book whose description contains 'science', please go http://localhost:8000/book/ and click the 'Filters' icon on the page. Then use the search function. <br /><br />

## If you want to update and delete data, you can use other ways to send http requests from the frontend:

### 6. Delete a book (DELETE)
For example, you can issue a DELETE request to the following url
http://127.0.0.1:8000/book/?name=bookname <br /><br />

### 7. When a new user become interested in a book  (PATCH)
In this case, you should send a PATCH request to update the 'peopleInterested' field of the book. <br />
step 1: Get the book's 'peopleInterested' that you will update. For example, the current list is [1,2] <br />
step 2: Issue a PATCH request with the updated list. For example, you want to add a new user with id 3 to book with id 1, then issue PATCH request to http://127.0.0.1:8000/book/1/ with the new peopleInterested list: [1,2,3] <br /><br />
#### Note: The 'booksInterested' field of the corresponding user will be updated automatically, so you don't need to update it<br /><br />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Frontend


## Available Scripts

In the project directory, you can run:

### `yarn install`

Run this command when you firstly download this repository. This will help you install all dependencies used in this project.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

