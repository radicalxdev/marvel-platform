# RadicalX Platform

RadicalX is a platform that reimagines upskilling with financial rewards and AI. 

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [License](#license)

## Introduction

RadicalX is a platform that reimagines upskilling with financial rewards and AI. It is an immersive digital world for next-gen developers, where they are guided by an AI Manager and work in teams at a fantasy company to earn money by competing in sponsored coding contests that simulate day-in-the-life scenarios.

RadicalX offers a number of benefits to developers, including:

 - A personalized learning experience that is tailored to their individual needs and interests
 - The opportunity to work on real-world projects that are used by companies around the world
 - The chance to compete against other developers from around the world and win prizes
 - The ability to earn money while they learn


## Installation

First install your node_modules

```bash
npm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

RadicalX offers a number of features that make it an ideal platform for developers who are looking to upskill and earn money. These features include:

 - Personalized learning experience: RadicalX uses AI to personalize the learning experience for each developer. This means that you will be able to learn at your own pace and focus on the topics that are most relevant to you.
 - Real-world projects: RadicalX offers a variety of real-world projects that you can work on. This is a great way to gain experience and build your portfolio.
 - Competition: RadicalX offers a variety of opportunities to compete against other developers. This is a great way to test your skills and improve your ranking.
 - Earn money: You can earn money by competing in sponsored coding contests and completing other tasks. This is a great way to offset the cost of learning and   earn some extra cash.


## Folder Structure

This project is built using NextJS 12.3 therefore the structure of the folders and files are complementary to this framework, see below for more info: 

```bash
- /assets: Contains all the static files.
  - /images: Contains all images in the project.
  - /svg: Contains all svgs in the project.

- /components:  Contains reusable UI components.

- /firebase: Contains firebase init configurations

- /funtions: Contains all serverless back-end code 
    - index.js: main file exported from this folder

- /layouts: Contains all project layouts

- /pages: NextJS default folder where all routes are defined
    - /api: Contains all route APIs in this projects  "(/api/*)"
        - /auth: Contains all authentication routes for this project
            - login.js: Contains logic for "(/api/login)" route.
            - signup.js: Contains logic ofr "(/api/signup)" route.
    - /leaderboards: Leaderboards page accessed through "(/leaderboards)"
        - Leaderboards.jsx: Exported page file
        - index.js: encapsulates folder
    - /login: Login auth page accessed through "(/login)"
        - Login.jsx: Exported page file
        - index.js: encapsulates folder
    - /rewards: Rewards page accessed through "(/rewards)"
        - SignUp.jsx: Exported page file
        - index.js: encapsulates folder
    - /signup: Sign auth page accessed through "(/signup)"
        - SignUp.jsx: Exported page file
        - index.js: encapsulates folder
    - app.jsx: Used by NextJS to initialize pages
    - _document.jsx: Contains html and body tags for the project.
    - index.jsx: This is the index path "/" file for this project.

- /public: Contains all public files for the project.
  - /fonts: Contains all custom fonts for this project.
    - /Satoshi: Contains all satoshi local fonts.
    - /MoldeSemiExanded: Contains all moldeSemiExpanded fonts.
  - favicon.ico: This is favicon for the project.

- /services: Contains all functions and methods for backend services and API integrations

- /styles: Contains all css files for this projects styling.

- /theme: Contains theme for this project
    - theme.jsx: Exports Material UI custom theme object.
```

## Tech Stack

Here is the list for the technologies used in this project

- Front-end: NextJS | Material UI
- Back-end: Firebase Hosting | Firebase Database | Firebase Cloud Functions
- Others: Stripe | Runa | Vertex AI

## License

This project is intellectual property of RadicalX.
Third-party libraries, assets, and dependencies used in this project are subject to their respective licenses.





