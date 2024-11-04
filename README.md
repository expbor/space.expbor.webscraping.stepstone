# Webscraper for www.stepstone.de

## Description

This script scrapes the projects of www.stepstone.de  

Starting from the start url:
![grafik](https://github.com/user-attachments/assets/165a2ab9-e78a-4a45-bfab-7fb213f95a59)

the next Button is used until the end is reached.
![grafik](https://github.com/user-attachments/assets/f54d0103-343b-46a6-9eb0-65a1855fab96)


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






