# OpenJio

![CI Badge](https://github.com/joelwongjy/OpenJio/workflows/ESLint%20CI/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/129a14ea-c391-4889-bc81-4586418e3844/deploy-status)](https://app.netlify.com/sites/openjio/deploys)


### Site is deployed [here](https://openjio.netlify.app)!

### NUS Orbital (CP2106 Independent Software Development Project)<br>
<b>Orbital Targeted Level of Achievement:</b> Apollo 11

Team JoJo's Circus #2582<br>
Joel Wong & Joseph Marcus<br>

## Table of contents

- [Features](#features)
- [Motivations and Aims](#motivations-and-aims)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)

## Features

<b>List of core features</b>

- Create an OpenJio invite :white_check_mark:
- Generate 6-digit shareable code :white_check_mark:
- Share a link to join the food order to various Telegram groups
- View joined, created and closed (but pending payment) OpenJios :construction:
- Add order and items to an OpenJio :white_check_mark:
- View current orders in OpenJio :white_check_mark:
- Add cost of items after OpenJio is closed
- Split delivery cost and discounts among each order
- Mark order as paid
- Access to PayLah! link for payment
- View past orders and outstanding fees owed
- View monthly statistics of orders and spendings :construction:


## Motivations and Aims

<b>Problem Identification & Motivation: </b>
You’re staying in Hall and craving some supper. You text the Level Telegram group to ask if anyone wants to combine orders. People start asking for the menu so you direct them to an external site. A whole bunch of orders comes in that flood the chat. After the food arrives, you hunt down each person for their payment and the chat is flooded with payment messages. Some people take ages to reply and the message gets drowned. Others do not know what number to pay to and delay payment until someone.

Sounds familiar? Why isn’t there a platform where everyone can consolidate their orders, payments are easy to track, and you can track your expenditure?

<b>Aim:</b>
We hope to streamline the food ordering experience by consolidating orders and payments through a Progressive Web App (PWA).

## Tech Stack

- PostgreSQL
- Express
- React
- NodeJS

## Setup

### Ensure that you have Node.js, npm and PostgreSQL installed.

If you do not have Node.js installed, it is recommended to install from their site [here](https://nodejs.org/en/). This will install the latest version of Node.js along with npm.

If you do not have PostgreSQL installed, download it [here](https://postgresapp.com/downloads.html).

### Clone the repository

```bash
git clone git@github.com:joelwongjy/OpenJio.git
```

### Install dependencies

1. To install frontend dependencies, `cd` to the frontend directory and run
    ```bash
    npm install
    ```
1. To run the Ionic app, install the Ionic CLI by running
    ```bash
    npm install -g @ionic/cli
    ```

1. To install backend dependencies, `cd` to the backend directory and run
    ```bash
    npm install
    ```

1. To create the PostgreSQL databases, in the backend directory, run
    ```bash
    ./setup_db.sh
    ```
    
    If your default Postgres account is not superuser `postgres`, switch to superuser by running
    ```bash
    sudo -u postgres psql
    ```
    
    Alternatively, rename the script to `setup_db_local.sh` and change `postgres` to the default account name. Then run
    ```bash
    ./setup_db_local.sh
    ```

## Development

### Start server in development

1. Run Postgres app and start the server on `Port 5432`.

2. Start the local backend server by running
    ```bash
    npm start
    ```

The server should now be running locally on `localhost:3001`, and the API can be reached via `localhost:3001/v1`.

The backend server must be running before starting the app.

### Start app in development

1. Start the app by running
```bash
ionic serve
```

The app should now be running locally on `localhost:3000`.

The website should be now be live and connected with the backend server and database.
