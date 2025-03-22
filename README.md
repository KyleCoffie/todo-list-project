# Task Management Application

This application is a task management tool built with React and TypeScript. It allows users to:
- Create new tasks with a title, description, due date, and status.
- View a dashboard of all tasks, with the ability.
- Edit existing tasks to update their details.
- Delete tasks that are no longer needed.
- Authenticate using Auth0 to ensure that only authorized users can access the application.

## Project Setup

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:

    ```bash
    cd todo-list-project
    ```
3.  Install the dependencies:

    ```bash
    npm install
    ```

## Installation

1.  Create an account on Auth0 and create a new application.
2.  Configure the Auth0 application with the following settings:
    *   **Allowed Callback URLs:** `http://localhost:5173/callback`
    *   **Allowed Logout URLs:** `http://localhost:5173`
    *   **Allowed Web Origins:** `http://localhost:5173`
3.  Update the `src/Auth0Provider.tsx` file with your Auth0 domain and client ID.

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```
2.  Open the application in your browser at `http://localhost:5173`.
3.  Log in with your Auth0 account.
4.  Create, edit, and delete tasks using the task dashboard.
