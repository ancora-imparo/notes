FROM node
WORKDIR /usr/app
COPY types.d.ts ../
COPY ./server .
RUN  npm install typescript -g && npm install
EXPOSE 3000
CMD npm test 
