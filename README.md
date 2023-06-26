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

bash
git clone https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App


2. Navigate to the project directory:

bash
cd  quiz-game


3. Install the dependencies:

bash
npm install


4. Start the development server:

bash
npm  run dev

5. You need to have :

 bash
 node-v16.17.0-x64msi

 
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
