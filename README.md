# Blockits

Blockits is a dead simple crypto investor dashboard. Import Gdax public api key and see an overview of your crypto metrics. Watch your blockchain profits with Blockits.

## Installation and startup

open your terminal and type the commands below:

1. clone the repository
```bash
git clone https://github.com/Jlevyd15/gdax-api-test.git
```
2. from the repositorty directory install the npm modules
```bash
npm install
```
3. start the server
```bash
npm run start
```
4. open a browser and navigate to the login page
```
http://localhost:3000/data/login
```

## Key Generation and Usage

The current implementation is for testing purposes only. It is only compatible with gdax trading platform thus far. You'll need to first head over to Gdax, login and generate an api key, explained below.

1. Login to Gdax and go to the api settings page [here](https://www.gdax.com/settings/api)
1. Under the permissions selections check the box for 'view'
1. copy the auto generated passpharse and keep it somewhere, you'll need it later
1. Click "Generate API Key'
1. you will then see the public API key and a seceret key copy both of these we will use them in the next step. 
1. finally you should have the these three things
    1. public key
    2. secret
    3. passphrase

1. once you have these head over to your browser (assuming you have followed the installation and startup instructions above) and enter them into the app in their respective places. [Here](http://localhost/data/login)