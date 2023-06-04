Blog Rendering using React

A react front end UI and a node server which renders a blog page. The blog page data is fetched from a node backend created in node.js.
Features

    fetches blogs from an node backend and displays all blogs on home page
    shows blog detail on clicking any blog card
    dynamically rendering blogs on detail page
    dynamically creates blogs
    options to add in a thumbnail(albeit yet to render)
    dynamic navigation based on logged in user
    all auth login is implemented on the backend

Drawbacks

    needs a global state management
    blog rendering along with other frontend features is very basic
    auto logout is very buggy

Downloading and Running this Project Locally

    clone the repository

git clone <https://github.com/bugger69/Blog_Site.git>

    open a split terminal
    
    change the directory to client in one and server in another

    run command npm i to install all dependencies in both terminals

    now to run the app run the below command:

npm start in the client terminal

npm run dev in the server terminal

In order to upload thumbnails, you'd have to create a cloudinary account and a .env file in the server, where you set CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY and CLOUDINARY_SECRET to their respective values.

Available Scripts

In the project directory, you can run:
npm start

Runs the app in the development mode.
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.

License

This project is licensed under the MIT License - see the LICENSE.md file for details
