# Setup Instructions
Below are the instructions to run this project on your local machines.
If you face any problem or encounter any issue, please let me know via [Mail](mailto:mayank_m@cs.iitr.ac.in)
## Local Setup
### Backend and Database
1. Requirements
  - PostgreSQL [Guide to install and setup](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-20-04)
  - Python3^
2. Databse setup instructions
 - Fanland uses postgreSQl as database tool so you first need to create a databse on your local machine using postgres. Install postgresql if you haven't already.
 - After installing postgresql on your machine, run the below commands on your `Terminal`.
 ```
sudo -u postgres psql
CREATE DATABASE myfirstpsqlproject;
CREATE USER firstpsqluser WITH PASSWORD 'psqlpassword';
 ```
 - If you want to use your own names and password make sure to follow these below steps otherwise you can skip to step- 3 `Few Optimizations`.
   - After creation of the DB, you must configure it with the [fanland-backend](https://github.com/maayami/fanland-server).
   - Open your terminal again and clone the server code.
   ```
   git clone https://github.com/maayami/fanland-server
   ```
   - then open `../fanland-server/testproject/testproject/settings.py`.
   - then on line 82, you will see the default DB configs like this
   ```
   DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'myfirstpsqlproject',
        'USER': 'firstpsqluser',
        'PASSWORD': 'psqlpassword',
        'HOST': 'localhost',
        'PORT': '',
        }
    }
    ```
  - update the above variables i.e. `NAME` , `USER` and `PASSWORD` accordingly.

3. Few Optimizations
- Afterwards, we’ll modify a few of the connection parameters for the user we just created. This will speed up database operations so that the correct values do not have to be queried and set each time a connection is established.

- We are setting the default encoding to UTF-8, which Django expects. We are also setting the default transaction isolation scheme to “read committed”, which blocks reads from uncommitted transactions. 
```
ALTER ROLE firstpsqluser SET client_encoding TO 'utf8';
ALTER ROLE firstpsqluser SET default_transaction_isolation TO 'read committed';
ALTER ROLE firstpsqluser SET timezone TO 'Asia/Kolkata';
```
- Now, we can give our new user access to administer our new database:
```
GRANT ALL PRIVILEGES ON DATABASE myfirstpsqlproject TO firstpsqluser;
exit
```
- Note:  give the Databse name and user name accodingly.

4. Setting up the API
- Clone the [fanland-server](https://github.com/maayami/fanland-server).
``` 
git clone https://github.com/maayami/fanland-server
cd fanland-server/testproject/
```
- create a virtual environemnt before any installation in the testproject root `../fanland-server/testproject/`.
```
python3 -m venv .venv
source .venv/bin/activate
```
- When done install the dependencies in the `../fanland-server/testproject/`
 ```
 pip install -r requirements.txt
 cd testproject
 ```
 - check your pwd, it should be `../fanland-server/testproject/testproject/`
 - makemigrations to create the database tables `python manage.py makemigrations`.
 - migrate the changes `python manage.py migrate`.
 - run the API server by typing `python manage.py runserver`.
> Done!
 
## Setting up the socket-server
1. Prerequisites
- node and npm
- nodemon, install nodemon dependeing on your OS.
2. Setup Instructions
- Fanland uses socket.io for RTC. The code for fanland-socket-server can be found on [fanland-socket-server](https://github.com/maayami/fanland-socket-server).
```
git clone https://github.com/maayami/fanland-socket-server
cd fanland-socket-server
npm install
```
- After installing `nodemon` and typing `npm install` inside `../fanland-socket-server/`.
- run the socket server
```
nodemon index.js
```
> # Note: if your port crashes try to setup the frontend first and then run the socket server.
> Done!
 
## Setting up the frontend
Fanland frontend is built in React
1. Prerequisites
- node and npm
2. Setup Instructions
- clone the repository
```
git clone https://github.com/maayami/fanland-frontend
cd fanland-frontend
```
- install the dependencies
```
npm install
```
- run the server `npm start`
- visit [port:3000](http://localhost:3000/) on your browser.
> Done!
