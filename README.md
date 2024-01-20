# Docker example
#### (based on lecture 11 examples app)

#### There 2 dockerfiles added: one for building angular app container image, one for building api container image
#### Additionally we have nginx.conf file which is used for serving angular app using nginx web server (to make angular routing work when directly navigating to url)
#### Finally we have compose.yaml file for startin (and optionally buildilng) all containers
#### Additinally there cmd files which contain commands that you can run for building images manually (from cmd/terminal)

#### There are 3 containers defined in compose file:
- angular app (frontend)
- angular api (backend)
- db - database (just sample, here we use json-server, but in real world example angular-api container would connect do database)

### use `docker compose up -d` for running prebuilt images
### use `docker compose build` to build images
### use `docker compose up -d --build` to build and run images

if you dont want to use compose for building, you can remove build sections from compose.yaml file

#### Don't forget to change images  ( yourdockerid/image-name) in compose file if you would like to upload images to dockerhub

### use `docker compose push` after `docker compose build` to upload images to docker hub

### Alternatively you can use  `docker push yourdockerid/image-name` to push individual image to docker hub

