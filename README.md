# TaskTrack 📋✨

Welcome to **TaskTrack**, a MERN stack project designed to help you manage your tasks efficiently.

## Project Structure 📂
- **Frontend**: Contains the client-side code.
- **Backend**: Contains the server-side code.

## Key Features 🌟

- **Drag & Drop**: Easily update the status of tasks with a simple drag-and-drop interface.
- **Search & Sort**: Quickly find and organize tasks with powerful search and sort functionalities.
- **Full CRUD Operations**: Create, read, update, and delete tasks seamlessly.
- **User Authentication**: Register and login with email, or use Google for a quick login experience.

## Backend Setup 🚀

1. **Navigate to the backend folder**:
    ```bash
    cd backend
    ```

2. **Initialize the project**:
    ```bash
    npm init -y
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file** and add the following variables with their respective values:
    ```plaintext
    NODE_ENV=your_node_env
    JWT_SECRET=your_jwt_secret
    CLIENT_ID=your_client_id
    CLIENT_SECRET=your_client_secret
    MONGO_URI=your_mongo_uri
    ```

5. **Database Setup**:
    - Login to MongoDB Atlas and create a project.
    - Add the connection link to your `.env` file.

6. **Google OAuth Setup**:
    - Go to the Google Developer Console.
    - Create OAuth credentials for Google login.
    - Add `CLIENT_ID` and `CLIENT_SECRET` to your `.env` file.

7. **Start the development server**:
    ```bash
    npm run server
    ```

## Frontend Setup 🌐

1. **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run server
    ```

## Deployed Project 🌍
Check out the live project here. [click here](https://tasktrack-frontend.onrender.com/tasks)

---

Feel free to contribute and make this project even better! 😊

Happy Coding! 💻✨
