# wireframe-app

Fullstack application demo as personal boilerplate, and for academic purpose    

Frontend was built based on [facebook/create-react-app](https://github.com/facebook/create-react-app)  
Backend was built based on [docker/getting-started](https://github.com/docker/getting-started)  

## Quick start

Leveraging `docker-compose`, It will build frontend, start server and mysql together using all-in-one command in terminal:

```
> docker-compose up -d --build
```

It will take a while to start up whole stack, allow to wait up to 20 seconds  
once see `wireframe-app` appears in docker desktop with 3 containers inside (you should see 2 running, 1 exited 0), it should be good to go  


## Add test data into db

Use browser and browse following URL:

```
http://localhost:5000/api/set-test-data
```

this inject test data to freshly created mysql db, once you see message `added 3 test item to db`, you may close the tab and open another tab for frontend

```
http://localhost:5000/output/
```


## Stop

To stop and remove all containers and volumes together using command in terminal:

```
> docker-compose down --volume
```

*** Remove the `--volume` if you want database data to persist to next startup  


## Build separately

It's possible to build frontend / backend separately

### Frontend

With terminal opened, Navigate to _packages/frontend_, you may perform either actions.

1. Dev build (NodeJS only)
    > npm install && npm run start
2. Production build (NodeJS / Docker)
   1. > npm install --production && npm run build
   2. > . build.sh

### Backend

[Backend API](./packages/backend/README.md)

With terminal open, Navigate to _packages/backend_, you may perform either actions.

> . start.sh

This will start both server and mysql for development, but it will not clean up network created in docker for you




