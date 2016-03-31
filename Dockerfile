FROM node

RUN npm install -g typescript ts-node yo tsserver-client nodemon
RUN curl -L https://github.com/docker/compose/releases/download/1.6.2/docker-compose-`uname -s`-`uname -m` > /usr/bin/docker-compose
RUN chmod +x /usr/bin/docker-compose 

ADD . /dockerPDE
WORKDIR /dockerPDE

RUN npm run install-server && npm run install-client

CMD npm start


