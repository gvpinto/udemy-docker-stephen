## Section 6. Production Grade Workflow


### Create React App
`npx create-react-app frontend`

### Necessary Commands

```
  npm start
  npm run start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
  npm run test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
```

We suggest that you begin by typing:
```
  cd frontend
  npm start
```

### Building a custom Dockerfile
`docker build -f Dockerfile.dev .`
`docker build -t piercingstripes/react-app-1 -f Dockerfile.dev .`

*Delete the node_modules file before running docker build*

### Running the docker container
`docker run -p 3000:3000 <image id or name>`

### Volumes to assist with development
`docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image id or name>`

### WSL Windows users must read before next lecture
[WSL Remediation](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/18799500#overview)

### Running the container
`docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app piercingstripes/react-app-1`

### Running docker compose
`cd /home/gjvr6pinto/workspace/docker/udemy-docker-stephen/section6/frontend`
`docker compose up`


## Running Tests Option 1

### Build docker image
`docker build -f Dockerfile.dev .`


### Run docker test suite interactively
`docker run -t f928d3556a68 npm run test`

### Get ID of a running container
`docker ps`

### Triggering the test suite whenever application code is changed
> Run the application with `docker compose up`
>
> Open a new terminal and run the test using run exec -it `docker exec -it f928d3556a68 npm run start`


## Running Tests Option 1

> Update docker compose
>
> run `docker compose up --build`
>
> change code in App.js and see if it gets reflected
> 
> Use docker attach connects to the stdin, stdout and stderr of the process running in the container
>
> `docker ps`
>
> `docker exec -it <image id of the test container> sh`
>

## NGINX - Multi Step process (Build and Run phase)

build image on the default docker file

`docker build .`

`docker run -p 8080:80 <image id>`

















