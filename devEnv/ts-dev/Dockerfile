FROM node:5.2


RUN npm install -g typescript ts-node yo tsserver-client


RUN git clone git://github.com/c9/core.git cloud9 && \
		cd cloud9 && ./scripts/install-sdk.sh