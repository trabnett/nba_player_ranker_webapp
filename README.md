This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

NBA Player Ranker is a one page React app that allows users to enter the name of a past or present NBA player, then retireves relevant data from the [NBA Player Ranker Server](https://github.com/trabnett/nba-player-ranker-server) which provides relevant pictures, info and videos from other internet sources. It also alows you to rank your list of players. Each User is allowed 2 votes every five minutes. Users are identified by their public IP address. Data is stored persistantly with Postgres.

This webapp is hosted on heroku at:
[NBA Player Ranker webapp](https://nba-player-ranker.herokuapp.com)

#### Dependencies and Requirements:

+ Node
+ React
+ Bootstrap React
+ Reactstrap
+ Reactplayer
+ Gulp


#### Quick Start
1. Clone the repo  
``
 $ git clone https://github.com/trabnett/nba_player_ranker_webapp  
``  
``
 $ cd nba_player_ranker_webapp  
``

2. Install dependencies  
``
$ npm install  
``
3. Run  
``
$ npm start  
``
  
Search for NBA players and get data and pics using Azure and Beautiful Soup

![gif1](https://github.com/trabnett/nba_player_ranker_webapp/blob/master/public/gifs/NBA1.gif)

Watch Videos of your favorite players and uprank or downrank them

![gif2](https://github.com/trabnett/nba_player_ranker_webapp/blob/master/public/gifs/NBA2.gif)

Responsive styling using React-Bootstrap

![gif3](https://github.com/trabnett/nba_player_ranker_webapp/blob/master/public/gifs/NBA3.gif)
