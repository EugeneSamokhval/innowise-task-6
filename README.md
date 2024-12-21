# Task Tracker App

Task Tracker App is a web application built with Vue 3, using Vite and Firebase. The app allows users to track tasks, utilizing Vue Router for routing and Firebase integration for authentication and data storage.

---

## Installation and Setup

### 1. Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/EugeneSamokhval/innowise-task-6.git
cd task-tracker-app
```

### 2. Install dependencies

Make sure you have **Node.js** installed. Then, install the dependencies:

```bash
npm install
```

---

## Firebase Configuration

### 1. Create the configuration file

To work with Firebase, create a `firebase-config.env` file in the src directory of the project. This file should contain the `firebaseConfig` object to be exported. Example content for the file:

```javascript
// firebase-config.env
export const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
}
```

**Note:** Get your configuration keys from the [Firebase console](https://console.firebase.google.com/).

---

## Running the Project

### Development Mode

```bash
npm run dev
```

This will start the development server on [http://localhost:5173](http://localhost:5173).

### Build the Project

```bash
npm run build
```

This will create an optimized version of the project for production.

### Preview the Production Version

```bash
npm run build
npm run preview
```

---

## Development Scripts

- **Linting and formatting:**

  - Run ESLint to check your code:

    ```bash
    npm run lint
    ```

  - Format the code using Prettier:

    ```bash
    npm run format
    ```

---

## Technologies Used

- **Vue 3** — the main frontend framework.
- **Vue Router** — for routing within the app.
- **Firebase** — for backend and authentication.
- **Vite** — bundler and development server.
- **ESLint & Prettier** — tools for code quality and formatting.

---
