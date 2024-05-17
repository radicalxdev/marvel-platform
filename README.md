# Kai AI Platform
Kai is an open source project by Radical having chatbot and smart tools for teachers.

## Table of Contents

- [Architecture](#Architecture)
- [Folder Structure](#folder-structure)
- [Setup](#Setup)
- - [Local Development](#local-development)
- - [Cloud Deployment](#cloud-deployment)
- [Contributing](#Contributing)
- [License](#license)

## Architecture
The "Kai" platform is structured into two main components: Firebase and AI. The Firebase side, detailed in this repository, encompasses both the frontend, developed with NextJS and hosted on Firebase Hosting, and the backend, which includes user management and session handling via Firebase Functions like `signUpUser` and `createChatSession`. The `communicator` and `toolCommunicator` functions act as proxies, facilitating interaction between the Firebase infrastructure and the AI services, ensuring seamless data flow and integration. Firestore DB is utilized for data storage. The AI components, housed in a separate repository, include a chatbot and tools like "Quizify" and "YouTube Flashcard Generator." 

![Architecture Diagram](architecture.png)

### Folder Structure
## Folder Structure Overview

- **`/frontend`**:
  Contains all the files related to the front-end application, including the NextJS app and associated resources.

- **`/functions`**:
  Houses the Firebase Functions, which are serverless functions responsible for backend processes such as AI chatbot and tools communicators

## Key Files
- **`firebase.json`**:
  Contains configuration settings for Firebase services such as hosting and rules.

- **`firestore.indexes.json`**:
  Manages custom indexing for Firestore to optimize query performance.

- **`firestore.rules`**:
  Security rules for Firestore database, defining read/write permissions.

- **`package.json`** & **`package-lock.json`**:
  Defines the project’s global dependencies

## Prerequisites
- Node.js (v14 or later)
- Firebase CLI (v9.10.0 or later)
- Google Firebase Account

## Setup
To set up the project, follow these steps:

## Local Development
1. Clone the repository: `git clone https://github.com/radicalxdev/kai-platform`
2. Create your firebase project on google firebase console
3. Create a firestore database instance
4. Get firebase config from firebase project settings in firebase console and save it to .env (create in root of this project, see sample.env for refrence)
5. Generate a new private key from the projects settings and save that to the .env file as well
6. Install Firebase CLI by running following in terminal: `npm install dev`
7. Login to firebase CLI by running following command: `firebase login`.

### Backend
1. Navigate to back-end project directory: `cd functions`
2. Install dependencies: `npm install`
3. Run for local testing: `firebase serve --only functions`

### Frontend
1. Navigate to back-end project directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run for local testing: `npm run dev`

### Local Emulator (Optional)
#### Setup
1. Start emulator `firebase emulators:start`
2. Run database seed `node functions/local_db_seed.js`  

## Cloud Deployment
1. Clone the repository: `git clone https://github.com/radicalxdev/kai-platform`
2. Navigate to back-end project directory: `cd functions`
3. Install Frontend dependencies: `npm install`
4. Navigate to functions directory: `cd .. && cd frontend`
5. Install dependencies: `npm install`
6. Deploy: `firebase deploy` (this will deploy frontend and backend, if you only want to deploy frontend use firebase deploy --only hosting)
7. Run: `node functions/cloud_db_seed.js`

## Contributing

If you would like to contribute to the project, please follow the guidelines in the `CONTRIBUTING.md` file.

## License

This project is licensed under the [MIT License](LICENSE).
