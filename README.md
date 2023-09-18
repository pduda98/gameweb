# GameWeb

## Description

GameWeb is a web application developed for the "IT Project Management" ("Zarządzanie projektem informatycznym") course. The application serves the purpose of rating and reviewing games. It features basic functionalities including user registration, login, and game searching.

## Features

- User registration and authentication
- User login
- Game search and browsing
- Game rating and reviews

## Requirements

Before you begin, ensure you have the following installed:

- .NET 6.0 SDK: [Download](https://dotnet.microsoft.com/download/dotnet/6.0)
- Node.js: [Download](https://nodejs.org/)
- Yarn (optional): [Download](https://yarnpkg.com/)

## Installation

To run the project locally, follow these steps:

1. Clone this repository to your computer.

```bash
git clone https://github.com/pduda98/gameweb.git
```
2. Navigate to the project folder.
```bash
cd server/GameWeb
```
3. Install backend dependencies.
```bash
dotnet restore
```
4. Navigate to the frontend folder.
```bash
cd client
```
5. Install frontend dependencies.
```bash
npm install
# or
yarn install
```
## Running the Application
After completing the installation process, you can run the project in development mode using the following commands:

### Backend (.NET 6.0)
```bash
cd server/GameWeb
dotnet run
```
### Frontend (React)
```bash
cd client
npm start
# or
yarn start
```
Open a web browser and go to http://localhost:3000 to see the application in action.

## License
This project is licensed under the MIT. See the LICENSE file for details.