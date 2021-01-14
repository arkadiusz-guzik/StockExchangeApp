# StockExchangeApp

## About
StockExchangeApp is a simulation of real stock exchange market. Information about share prices is loaded using websocket. It is not sent at all times and you have to wait a while after logging into the website.

## Functionalities
The user can create an account where entered password is encoded using bcrypt hashing function. After logging into the account apart form the authentication that checks the correctness of the entered data by the user there is generated a JWT token. It is only valid for 30 minutes and after this time the user is asked to extend the session. The user can make buy / sell transactions and has access to their history.

## Installation

In the first step you have to create database using the 'create-db.sql' file. Then go to the 'websocket-key.ts' file located in the `StockExchangeApplication\src\app\models` directory and enter a valid value for the TOKEN variable. Open the 'StockExchangeApplication' directory in a terminal and run a dev server using the `ng serve` command (`http://localhost:4200/`). In a another terminal window open the'StochExchangeApplicationApi' directory and compile a project using `mvn install` command and then enter `java -jar target/StockExchangeApplicationApi-0.0.1-SNAPSHOT.jar` to run it. Navigate to `http://localhost:4200/`.

## Images
<img src="readme-images/img_0.jpg" width="800"/>

<img src="readme-images/img_1.jpg" width="800"/>

<img src="readme-images/img_2.jpg" width="800"/>

<img src="readme-images/img_3.jpg" width="800"/>

<img src="readme-images/img_4.jpg" width="800"/>