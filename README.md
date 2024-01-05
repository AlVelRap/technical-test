# API Starter NodeJS-MySQL

This is App was made for the technical test requested by Real Valladolid's Team.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Important](#important)

## Technologies

Built with:

- NodeJS 20.9.0
- ExpressJS 4.18.2
- MySQL 8.0.31
- JSON Web Token 9.0.1
- Angular 17.0.8
- Chart.js 4.4.1

## Getting Started

To run this porject you will need npm installed in your computer so, if you are using windows follow this [link](https://nodejs.org/en/download).

And if you are using linux you can use:

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

You will also need to have MySQL installed to run the database. If you are on Windows, you can follow this [link](https://dev.mysql.com/downloads/) to download the version you need.

When you have MySQL installed remember to start the database with the file `backend/init/exampledc.sql`.

### Installation

1. Clone or download this repository and install node modules:

```
git clone https://github.com/AlVelRap/api_node.git
cd backend
npm install
cd ../frontend
npm install
```

2. Modify `.env` file with all the configuration you want to apply.

3. if you modify `DB_USER`, `DB_PASSWORD` or `DB_NAME` variables from `.env` file, remember to modify script `exampledb.sql` with the new values.

### Usage

To start the API_REST Backend:

```
cd backend // Go to folder backend
npm run start
```

To start the Frontend Server for Angular.

```
cd frontend // Go to folder frontend
npm run start
```

### Important

I have create an user Admin, to access to de App, this is because we don´t have a register (I removed it to avoid leaving security gaps). The credentials for this Admin User are:

```
email: admin@rv.com
password: prueba
```
