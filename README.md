# Webscraper for www.stepstone.de

## Description

This script scrapes the projects of www.stepstone.de  

Starting from the start url:
![grafik](https://github.com/user-attachments/assets/325b69c6-8ed2-414f-86ac-b46f998e1117)

the next Button is used until the end is reached.
![grafik](https://github.com/user-attachments/assets/45e9b0b0-2ac8-4c24-bf3e-0af54c74e249)

Results are written to Docker Volume

## Configuration

create .env File at root level with values:

```sh
STARTURL=''
```

Path to Result file Data.json is defined in compose.yaml file

```sh
services:
  webscraping:
    build:
      context: . 
    env_file:
     - .env
    volumes:
    - ./:/usr/src/app/
    ports:
      - 3000:3000
```

## Run the App

```sh
docker compose up --build
```






