##  Team-Rainbow--Quiz-Game-App
## Team members:
<br>

1) Siri Chandana Sirigiri : @siri0314 <br>
2) Sushmitha Kishor       : @sushmithakishor23 <br>
3) Shirini                : @Shirini4 <br>
4) Harsha Vardhan Bojanki : @Harsha Bojanki <br>
5) Teja Mummana           : @MummanaTeja <br>
6) Sravya Kavuru          : @sravyakavuru4 <br>

<br>

#  Embedded Design Documentation <br>

<a href="https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/docs/index.html ">visit_embedded_design_doc <br>
To execute docs:
``` npm install```
    <br>
    ```jsdoc src -r -d docs```
<br>

![Alt text](<Embedded Doc.jpeg>


#  Quiz Game App - README

This README provides an overview and instructions for the Quiz Game app developed using React.js. This app allows users to play an engaging multiplayer quiz game, where they can compete with their friends and test their knowledge in various categories.

## Features

- *Quiz Gameplay:* Users can create or join game rooms to play with their friends in real-time.
- *Categories:* The app offers a wide range of categories for the quiz questions, allowing players to choose their preferred topic.
- *Real-time Updates:* The game provides real-time updates on scores, current question, and leaderboards.
- *Leaderboards:* Users can view their rankings and track their progress on the leaderboards.
- *Timer:* Each question is timed to add excitement and challenge to the gameplay.
- *Question Pool:* The app has a pool of carefully curated questions to ensure variety and fairness.

## Installation

To run the Quiz Game app locally,follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App
```

2. Navigate to the project directory:

```shell
cd  quiz-game
```

3. Install the dependencies:

```shell
npm install
```

4. Start the development server:

```shell
npm  run dev
```

5. You need to have :

 ```shell
 node-v16.17.0-x64msi
```
 
6. Open your browser and visit `http://localhost:5173` to access the app.

## Configuration

You can modify certain aspects of the app by editing the `vite.config.js` file. Here are some configurable options:

- *Socket Server URL:* Update the `SOCKET_SERVER_URL` variable to connect the app to a custom socket server.
- *Question Categories:* Add or remove categories in the `categories` array to modify the available quiz topics.
- *Number of Questions:* Adjust the `NUM_QUESTIONS_PER_GAME` variable to change the number of questions per game.

Please ensure you have a compatible socket server running to enable multiplayer functionality.

## Technologies Used

The Quiz Game app is built using the following technologies:

- *React.js:* A popular JavaScript library for building user interfaces.
- *Socket.IO:* A library that enables real-time, bidirectional communication between the browser and the server.
- *CSS:* Styling is done using CSS, and some components may use CSS-in-JS libraries.

## Contributing

Contributions to the  Quiz Game app are welcome! If you have any ideas, bug fixes, or improvements, feel free to open an issue or submit a pull request. Make sure to follow the existing coding style and commit guidelines.

## License

The  Quiz Game app is open-source and released under the [MIT License](LICENSE). You are free to use, modify, and distribute the app as per the terms of this license.

## Acknowledgments

- The developers would like to acknowledge the open-source community for their valuable contributions and the creators of the technologies used in this project.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
