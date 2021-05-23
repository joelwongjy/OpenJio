# OpenJio

NUS Orbital (CP2106 Independent Software Development Project)<br>
<i>By Joel Wong and Joseph Marcus</i><br>

## Table of contents

- [General info](#general-info)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)
- [Features](#features)
- [Status](#status)

## General info

<b>Orbital Targeted Level of Achievement:</b> Apollo 11

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

Ensure that you have Node.js, npm and Docker Compose.

If you have not installed Node.js, it is recommended to install Node.js from their site [here](https://nodejs.org/en/). This will not only install the latest version of Node.js but also npm.

If you do not have Docker Compose installed, follow the instructions [here](https://docs.docker.com/compose/install/). Generally, we advise installing [Docker Desktop](https://www.docker.com/products/docker-desktop), which comes with Docker Compose. Note that for Windows users, you may be required to install the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) instead.

### Clone the repository

```bash
git clone git@github.com:joelwongjy/OpenJio.git
```

### Install dependencies

To install frontend dependencies, `cd` to the frontend directory and run

```bash
npm install
```

To install backend dependencies, `cd` to the backend directory and run

```bash
npm install
```

## Development

### Start server in development

First, get the database server up by running

```bash
docker-compose up
```

Then, start the local backend server by running

```bash
npm start
```

The server should now be running locally on `localhost:3001`, and the API can be reached via `localhost:3001/v1`.

The backend server must be running before starting the app.

### Start app in development

```bash
ionic serve
```

The app should now be running locally on `localhost:3000`.

The website should be now be live and connected with the backend server and database.

## Features

<b>List of core features</b>

- Start a food order invite
- Share a link to join the food order to various Telegram groups
- Easy selection of food items through accessing the menu from GrabFood
- View open food orders and the current delivery cost for each order
- Split the cost of food and delivery among each person
- Access to PayLah! link for payment
- View past orders and outstanding fees owed

## Status

Project is under development
