### Build Docker image
`$ docker build .`

By default alphine base image doesn't have node

### Build Docker image with tag
`$ docker build -t piercingstripes/simpleweb .`

### Docker run the image
`$ docker run -p 80:8080 piercingstripes/simpleweb`

### Open a shell
`$ docker run -it piercingstripes/simpleweb sh`

### Open a shell in a running container using container name or id
`$ docker exec -it crazy_saha sh`

### List containers
`$ docker container ls`







