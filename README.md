# GameList

A simple website that allows users to create a list of games they want to play or are playing. The games are displayed on a kanban style layout with "Not Started", "In Progress", and "Complete" sections. 

## Features

- Add games to the list by entering the game's title and url to its thumbnail. Thumbnails can be easily found on steamdb by searching for the game's name and finding the thumbnail under the game's page.
- Add goals to games and reorder/check off goals as they are completed.
- A progress bar will fill up as goals are completed, and when all goals are done the game is considered complete and moved to the complete list.

## Technologies Used

- NextJS: A framework for building server-rendered or statically-exported React apps. This framework was chosen for its ease of use and ability to server-render the app for improved performance.
- Firebase: A platform for hosting and database services. Firebase was chosen for its simplicity and ability to quickly set up hosting and a database for the app.

## Design Decisions

- Kanban style layout: This layout is simple and intuitive, allowing users to quickly see the status of their games and move them between lists as needed. It also allows for easy reordering of games within each list.
- Thumbnail images: Adding images to the games makes the list more visually appealing and allows users to easily identify games. The thumbnails are also a useful point of reference when searching for the game on steamdb.
- Progress bar for goals: This helps users track their progress on each game and provides motivation to complete the goals. The progress bar also gives a clear indication of when a game is considered "complete" and can be moved to the appropriate list.
- Add game button: The add game button is prominently displayed on the page, making it easy for users to quickly add new games to their list.

## How to Use

1. Clone the repository and install the dependencies by running `npm install`
2. Create a firebase project and add the firebase config to `services\firebase.config.ts`
3. Run the development server using `npm run dev`
4. Open http://localhost:3000 in your browser to view the app

## Contributing

We welcome contributions to this project! If you have an idea for a new feature or have found a bug, please open an issue on the [GitHub repository](https://github.com/jrmuys/gamelist) to discuss it.

If you want to make a contribution, please fork the repository and create a new branch with a descriptive name. Once you have made your changes, submit a pull request for review.
