Blog Rendering using React

A react front end UI which renders a blog page. The blog page data is fetched from a node backend created in node.js training.
Features

    fetches blogs from an node backend and displays all blogs on home page
    shows blog detail on clicking any blog card
    dynamically rendering blogs on detail page
    dynamic navigation based on logged in user
    react app is hosted on Vercel
    all auth login is implemented on node auth server running on heroku

Drawbacks

    Local state management is used
    needs a global state management
    because of state management app is buggy - logout works only on home page
    app reloads on each requets

Extented Features

Worked on all the Drawbacks previously mentioned

    Used Redux For Global State Management
    bugs fixed :- logout working from each routes, checking auth and Dynamic Navigation
    App reloads fixed using History object
    maintained and re-performs auth and display blogs after page relods ( as redux looses its state ob page reloads)
    Used Redux-Thunk as a Middleware
    Used Reactstrap and Bootstrap for layouting the Blog List (Blog Home)

Default User Login Credentials To See Blogs

Email : altafshaikh@me.com

Password : R#1aasdf
Getting Started with Create React App

This project was bootstrapped with Create React App.
Downloading and Running this Project Locally

    clone the repository

git clone https://github.com/ialtafshaikh/react-blog-frontend.git

    change directory to cd react-blog-frontend

    run command npm i to install all dependencies

    now to run the app run the below command:

npm run start

Available Scripts

In the project directory, you can run:
npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.
npm run build

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.
Learn More

    You can learn more in the Create React App documentation.

    To learn React, check out the React documentation.

    Learn react router

    Learn react router video tutorial

    Redux Thunk video

    Redux thunk Blog

    Redux thub video

    Bootstrap and Reactstrap cards

    Redux Officail Tutorial

    Redux Tutorial playlist

Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
Live Demo of this Project

Live Working
Author

    Altaf Shaikh - work by - ialtafshaikh

altaf shaikh
License

This project is licensed under the MIT License - see the LICENSE.md file for details

