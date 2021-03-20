
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
> # Note: if your port crashes try to refresh the index.js file.
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

## The Fanland
![Screenshot from 2021-03-20 18-55-54](https://user-images.githubusercontent.com/55585868/111871132-a5912600-89ae-11eb-9b7f-70ef4dd6396d.png)
![Screenshot from 2021-03-20 18-59-48](https://user-images.githubusercontent.com/55585868/111871134-a7f38000-89ae-11eb-8126-787552b6799a.png)
![Screenshot from 2021-03-20 19-00-09](https://user-images.githubusercontent.com/55585868/111871137-a9bd4380-89ae-11eb-8b5e-671590a073f6.png)
![Screenshot from 2021-03-20 19-00-15](https://user-images.githubusercontent.com/55585868/111871139-ac1f9d80-89ae-11eb-9218-8f9320bb421a.png)
![Screenshot from 2021-03-20 18-52-46](https://user-images.githubusercontent.com/55585868/111871241-df622c80-89ae-11eb-92fe-dd5f52731cab.png)
![Screenshot from 2021-03-20 18-53-08](https://user-images.githubusercontent.com/55585868/111871243-e1c48680-89ae-11eb-8826-b2ea40beb1f0.png)
![Screenshot from 2021-03-20 18-51-43](https://user-images.githubusercontent.com/55585868/111871247-e8eb9480-89ae-11eb-9c99-361919f34dbe.png)
![Screenshot from 2021-03-20 18-51-51](https://user-images.githubusercontent.com/55585868/111871250-ed17b200-89ae-11eb-8f2f-3107a3bf5ac9.png)
![Screenshot from 2021-03-20 18-52-02](https://user-images.githubusercontent.com/55585868/111871251-eee17580-89ae-11eb-8ad4-9f209d621758.png)
![Screenshot from 2021-03-20 18-52-06](https://user-images.githubusercontent.com/55585868/111871252-ef7a0c00-89ae-11eb-8f57-36e483d46cd1.png)
![Screenshot from 2021-03-20 18-52-15](https://user-images.githubusercontent.com/55585868/111871254-f0ab3900-89ae-11eb-9be7-a2fd1e18d993.png)
