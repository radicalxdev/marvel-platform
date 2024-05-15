# Kai AI Platform
Kai is an open source project by Radical having chatbot and smart tools for teachers.
Platform is built on Firebase, using different services such as Firebase Auth, Firebase Functions and Firebase Hosting.
Frontend is built on NextJS and deployed on Firebase hosting

## Table of Contents

- [Architecture](#Architecture)
- [Folder Structure](#folder-structure)
- [Setup](#Setup)
- - [Local Development](#Local Development)
- - [Cloud Deployment](#Cloud Deployment)
- [Contributing](#Contributing)
- [License](#license)

## Architecture
The "Kai" platform is structured into two main components: Firebase and AI. The Firebase side, detailed in this repository, encompasses both the frontend, developed with NextJS and hosted on Vercel, and the backend, which includes user management and session handling via Firebase Functions like signUpUser and createChatSession. Firestore DB is utilized for data storage. The AI components, housed in a separate repository, include a chatbot and tools like "Quizify" and "YouTube Flashcard Generator." The communicator and toolCommunicator functions act as proxies, facilitating interaction between the Firebase infrastructure and the AI services, ensuring seamless data flow and integration.

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
1. Clone the repository: `git clone https://github.com/radicalx/rex-ai.git`
2. Create your firebase project on google firebase console
3. Get firebase config from firebase project settings in firebase console and save it to .env.local (create in root of this project)
4. Get service account key Google Cloud IAM and save it to google-service-account.json (create in root of this project)
5. Install Firebase CLI by running following in terminal: `npm install dev`
6. Login to firebase CLI by running following command: `firebase login`
7. Add required docs to Firestore DB [todo: @shehreyar]

### Backend
1. Navigate to back-end project directory: `cd functions`
2. Install dependencies: `npm install`
3. Run for local testing: `firebase serve --only functions`

### Frontend
1. Navigate to back-end project directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run for local testing: `npm run dev`

### Local Emulator (Optional) [todo: @shehreyar]
#### Setup
1. Start emulator `firebase emulators:start`
2. Run database seed `node db-seed.js`  

## Cloud Deployment
1. Clone the repository: `git clone https://github.com/radicalx/rex-ai.git`
2. Navigate to back-end project directory: `cd functions`
3. Install Frontend dependencies: `npm install`
4. Navigate to functions directory: `cd .. && cd frontend`
5. Install dependencies: `npm install`
6. Navigate to back-end project directory: `cd ..`
7. Deploy: `firebase deploy` 
(this will deploy frontend and backend, if you only want to deploy frontend use firebase deploy --only hosting)

## Contributing

If you would like to contribute to the project, please follow the guidelines in the `CONTRIBUTING.md` file.

## License

This project is licensed under the [MIT License](LICENSE).
