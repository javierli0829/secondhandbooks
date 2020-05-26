# Backend

The following are the steps to start the backend service on Mac:<br />
`$ cd backend`<br />

step 1: Create a virtual environment<br />
`$ virtualenv venv`<br />
`$ source venv/bin/activate`<br />

step 2: Install all dependencies<br />
`$ brew install redis`<br />
`$ brew services start redis`<br />
`$ pip install -r requirements.txt`<br />

step 3: Migrate the database<br />
`$ python manage.py migrate`<br />

step 4: Start the backend server <br />
`$ python manage.py runserver`<br />

step 5: Start the celery worker:<br />
start command in another shell: <br />
`$ celery -A bookExchange worker -l info` <br />


# Frontend

This frontend is built based on `create-react-app`, so most of the command follow its rules.

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

