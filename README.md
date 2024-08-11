# Agile Poker
## Online estimation game for sprint planning 
This game allows users to join an online session, participate in task estimation, and select the complexity of a task by choosing a card value. Once all participants have made their selections, the game leader reveals the cards, and the game calculates the score.

In the game, users are divided into Leads and Participants. Leads have the ability to reveal the cards and calculate the game score, reset the game (which resets all card values to 0), or clean the game (removing all users, requiring them to rejoin). All Participants can join the game by copying and sharing the game URL.

The project consists of a Node.js API backend and a React frontend. To run it on your machine, I recommend using Docker Compose. You'll need to update the environment file located at ./frontend/.env to specify the IP address of the machine used by Docker Compose for the online game. Below is an example Docker Compose file along with the necessary environment variables.

Docker-compose file:

```sh
version: "3.8"
services: 
  backend:
    build: ./backend
    container_name: agile-poker-api
    ports:
      - '5000:5000'

  frontend:
    build:
      ./frontend
    container_name: agile-poker-ui
    environment:
      env_file: ./frontend/.env  # <= file to update
    ports:
      - '80:80'
    depends_on:
      - backend
```

.env File:

```sh
REACT_APP_PT_API_SERVICE_SERVICE_HOST=192.168.1.16:5000  # <= change the ip address or provide url
REACT_APP_PT_API_SERVICE_UI_HOST=192.168.1.16:80 # <= change the ip address or provide url
```

