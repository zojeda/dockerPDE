FROM node:5.2


RUN npm install -g typescript ts-node yo tsserver-client ungit


RUN git clone git://github.com/c9/core.git cloud9 && \
		cd cloud9 && ./scripts/install-sdk.sh
    
RUN apt-get update && apt-get install -y \
    vim \
    mc  \
    htop