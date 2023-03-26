
EACCES: permission denied, mkdir '/app/node_modules.cache' - Linux and WSL2 hosts
214 upvotes
214


Bobby · Lecture 69 · 2 years ago
When adding volumes and volume bookmarking to the docker run command you see these errors in your terminal:
"Failed to compile.
EACCES: permission denied, mkdir '/app/node_modules/.cache'"
3 replies

Follow replies

Bobby — Teaching Assistant

Answer
198 upvotes
198


2 years ago
There is an issue with permissions in regards to Linux hosts (which includes Windows WSL2) and volumes. It can be solved by doing the following:

FROM node:16-alpine
 
USER node
 
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
 
COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./
 
CMD ["npm", "start"]

Changes needed for Docker run command:
Remember to update the working directory paths in your docker run command to /home/node/app instead of just /app
eg:
docker run -it -p 3000:3000 -v /home/node/app/node_modules -v ~/my-project-directory:/home/node/app IMAGE_ID

Changes needed for Docker Compose - Single Container project
When we refactor to use Docker Compose, remember to update the working directory paths in your compose file:
volumes:
    volumes:
      - /home/node/app/node_modules
      - .:/home/node/app

Changes needed for Docker Compose - Multi Container project:
Remember to update the client service's working directory paths in your compose file:

    volumes:
      - /home/node/app/node_modules
      - ./client:/home/node/app

Explanation of changes:
We are specifying that the USER which will execute RUN, CMD, or ENTRYPOINT instructions will be the node user, as opposed to root (default).
https://docs.docker.com/engine/reference/builder/#user
We are then creating a directory of /home/node/app prior to the WORKDIR instruction. This will prevent a permissions issue since WORKDIR by default will create a directory if it does not exist and set ownership to root.
The inline chown commands will set ownership of the files you are copying from your local environment to the node user in the container.
The end result is that some files and directories will no longer be owned by root, and no npm processes will be run by the root user. Instead, they will all be owned and run by the node user.
Explanation of the Issue:
The core of the issue was the volume bookmarking (placeholder) was created by root. As a result, the node_modules will be owned by root. As part of the development process, the Webpack / Babel Loader will attempt to create a node_modules.cache folder as the Node user. In Node 15, 16+, this will result in a EACCES: permission denied.
The code above was taken from this thread:
https://github.com/nodejs/docker-node/issues/740
https://github.com/moby/moby/issues/36408
Also, you can read up on the chown flag for the COPY instruction here:
https://docs.docker.com/engine/reference/builder/#copy

ZF
Zhenwei
29 upvotes
29


2 years ago
If anyone is curious about where the node user came from, this is the answer I found from
https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker

By default, the Docker Node image includes a non-root node user that you can use to avoid running your application container as root. It is a recommended security practice to avoid running containers as root and to restrict capabilities within the container to only those required to run its processes. We will therefore use the node user’s home directory as the working directory for our application and set them as our user inside the container.

Bobby — Teaching Assistant
0 upvotes
0


1 year ago
This thread is considered locked. It is meant to be informational and already has an accepted answer.
If you have a question or concern regarding the solution that has been shared, please create a new question thread and provide as much detail about your issue along with any relevant code.
This thread will not be monitored and posts made here will be automatically removed periodically to prevent any confusion.