# myFlix Client-Side Application

## Objective
This project aims to build the client-side of the myFlix movie app using React. It integrates with the existing server-side code (REST API and database) built in a previous project. The client-side will allow users to interact with the app and receive data from the server-side.

## Context
In the past, web pages were generated on the server and sent to the browser, leading to poor user experiences. Modern tools like React have improved this process, making client-side development as important as server-side development.

In this project, we build the myFlix app's client-side with React, interacting with the REST API from the server-side to provide users with an interface to search, view, and manage movie information. This project is a part of mastering the MERN stack (MongoDB, Express, React, Node.js) and demonstrates full-stack JavaScript development skills.

## The 5 Ws
- **Who**: Movie enthusiasts interested in reading information about movies and managing their favorite movies list.
- **What**: A single-page, responsive web application with routing, rich interactions, and multiple views. It facilitates requests to and displays data from the server-side API.
- **When**: Users can access the app at any time to explore movies and manage their favorites.
- **Where**: The app is responsive and accessible online from any device.
- **Why**: Movie enthusiasts enjoy having quick access to movie information and managing a list of their favorite movies.

## User Stories
- As a user, I want to access information about movies so I can learn more about movies I've watched or want to watch.
- As a user, I want to create a profile to save my favorite movies.

## Features & Requirements

### Essential Views & Features:
- **Main View**: Displays all movies with images, titles, and descriptions, allows users to filter by search, view more details about a movie, log out, and navigate to the profile.
- **Single Movie View**: Shows detailed information (description, genre, director) about a selected movie and allows users to add it to their favorites.
- **Login View**: Allows users to log in using a username and password.
- **Signup View**: Allows new users to register with a username, password, email, and date of birth.
- **Profile View**: Displays and allows updating of user information, shows favorite movies, and allows removal of movies from the list. Users can also deregister their accounts.

### Optional Views & Features:
- **Actors View**: Allows users to view information about actors.
- **Genre View**: Displays information about a movie genre, including example movies.
- **Director View**: Shows details about a movie director, including example movies directed by them.

### Additional Single Movie View Features:
- Display actors in the movie
- Show release date and movie rating
- Allow sharing of movies
- Show related movies

### Additional Main View Features:
- Allow users to sort movies by different criteria.

### Additional Profile and Movie Management:
- Add a "To Watch" list alongside the "Favorite Movies" list.

## Design Criteria
The client-side app includes:
- Several interface views built with React
- Routing for navigation between views
- Responsive design using Bootstrap
- Function components to manage state and rendering

## Technical Requirements
- The app must be a Single-Page Application (SPA) using React and state routing.
- It must allow movie filtering through a search feature.
- Parcel is used as the build tool.
- Bootstrap is used for styling and responsive design.
- Written in ES2015+ JavaScript with function components.
- The app must be hosted online.
- React Redux may be used for state management (e.g., filtering movies).

## Tech Stack
- **Frontend**: React, React Router, Bootstrap
- **Backend**: REST API (Node.js, Express, MongoDB)
- **Build Tool**: Parcel
- **State Management (Optional)**: React Redux

## Installation
Clone the repository:
```bash
git clone https://github.com/o-vilna/MyFlix-client.git
```

Install dependencies:
```bash
npm install
```

Run the app locally:
```bash
npm start
```

## Hosting
The app is hosted online and can be accessed via [m-flixx.netlify.app](https://m-flixx.netlify.app/).

## License
This project is licensed under the ISC License.
