## Section 7. Continous integration and deployment with AWS


### Travis CI

Create a file `.travis.yml` in the root directory of the project

Write the following code

```yaml
sudo: required

services:
    - docker

before_install:
    - docker build -t piercingstripes/docker-react -f Dockerfile.dev .

script:
    - docker run -e CI=true piercingstripes/docker-react npm run test

```

### Run docker tests with coverage

`docker run piercingstripes/docker-react npm run test -- --coverage`

### Required Updates for Amazon Linux 2 Platform - DO NOT SKIP

When creating our Elastic Beanstalk environment in the next lecture, we need to select **Docker running on 64bit Amazon Linux 2** and make a few changes to our project:

![AWS](https://img-c.udemycdn.com/redactor/raw/article_lecture/2021-08-12_22-54-45-869eac7c20368edd48d9a2e110670f4f.png)

This new AWS platform will conflict with the project we have built since it will look for a docker.compose.yml file to build from by default instead of a Dockerfile.

To resolve this, please do the following:

1. Rename the development Compose config file

    Rename the docker-compose.yml file to docker-compose-dev.yml. Going forward you will need to pass a flag to specify which compose file you want to build and run from:

    ``` 
    docker-compose -f docker-compose-dev.yml up
    docker-compose -f docker-compose-dev.yml up --build
    docker-compose -f docker-compose-dev.yml down
    ```

2. Create a production Compose config file

    Create a docker-compose.yml file in the root of the project and paste the following:

    ```yaml
    version: '3'
    services:
    web:
        build:
        context: .
        dockerfile: Dockerfile
        ports:
        - '80:80'   
    ```

AWS EBS will see a file named docker-compose.yml and use it to build the single container application.



