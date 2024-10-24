# Bank Managing System

## About
The Bank Managing System is a software application designed to manage and handle various banking operations. It allows users to create accounts, deposit and withdraw money, transfer funds, and view account details. It is meant to run on localhost.

## How to Run the Project

### Prerequisites
- Ensure you have `python` installed on your systemwith the latest version.
- Ensure you have `node` installed on your system with the latest version.

### Steps to Run
1. Clone the repository:
    ```sh
    git clone https://github.com/SPCDIAZRIVERACHRISTIAN/BankManagingSystem.git
    ```
2. Navigate to the project directory:
    ```sh
    cd BankManagingSystem
    ```
3. use the requirements.txt to install all backend requirements in backend directory:
    ```sh
    pip install -r requirements.txt
    ```
4. install all packages on frontend directory using `npm install`:
    ```sh
    npm install
    ```
5. Create a .env file at the backend/ directory and add the following variables with your credentials (you will need an openai api key in order to use the chat bot):
    ```env
    DBNAME=your_db_name
    DBUSER=your_db_user
    DBPASSWORD=your_db_password
    DBHOST=your_db_host
    DBPORT=your_db_port
    SECRET_KEY=your_secret_key
    DEBUG=False
    ALLOWED_HOSTS=*
    OPENAI_API_KEY=your_openai_api_key
    ```
6. Sync the models to the database with this command:
    ```sh
    python3 manage.py migrate --run-syncdb
    ```
7. (OPTIONAL) Load the data.json in to your database:
    ```sh
    python3 manage.py loaddata data.json
    ```
8. Open two terminals and for the backend run the server with `python3 manage.py runserver` and frontend with `npm run dev`:
    ```sh
    python3 manage.py runserver
    ```
    ```sh
    npm start
    ```
9.Open link of the frontend terminal on prefered browser.

### Tips
You can use the mock user I have but i would suggest creating your own profile to see all that I made.
- username: 11b_shrink
- password: password

## Features
- Account creation
- Account CRUD manipulation
- Account details view
- Profile CRUD manipulation
- openai chatbot


