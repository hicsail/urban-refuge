# Urban Refuge Server

## Installation

- install packages
```
npm install
```

- create a new [Microsoft Live Auth0 app](https://account.live.com/developers/applications/index)

  When creating a new live Auth0 app:
    1. Application Id is AUTH0_CLIENT_ID
    2. Under Application Secrets generate new password to be UTH0_CLIENT_SECRET
    3. Under Platforms add new web application, and add callbackURL ```http://www.example.com/auth/windowslive/callback```
    4. Click save at bottom of page

- add env file to **/config/.env**
```
DATABASE_URL=postgres://username:password@host:port/database
AUTH0_CLIENT_ID=########-####-####-####-############
AUTH0_CLIENT_SECRET=#######################
AUTH0_CALLBACK_URL=http://www.example.com/auth/windowslive/callback
ROOT_EMAIL=emailAddress@emailAddress.com
```

## Running

```
npm start
```
