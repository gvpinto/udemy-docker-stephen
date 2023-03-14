# Visits

### Build docker image
`docker build -t piercingstripes/visits:latest`

### Docker compose to build and run the image
`docker compose up`

### Docker compose to re-build and run the image
`docker compose up --build`

### Docker compose to re-build and run the image in detached mode
`docker compose up --build -d`

### Docker compose stop containers
`docker compose down`

### Docker compose to list containers 
*Should be run from the directory where the docker-compose.yml exists*

`docker compose ps`

### URL to call the application
```
http://localhost:4001
http://piercingstripes-linux:4001
```
### Restart Policies
> 'no', always, on-failure, unless-stopped

### Status code
> 0 - We exited and everthing is okay
> 1, 2, 3 etc. - We exited because something went wrong

















