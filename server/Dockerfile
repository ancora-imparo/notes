FROM node
WORKDIR /usr/app
COPY ./types.d.ts ../
COPY . .
RUN  npm install typescript  -g && npm install
EXPOSE 3000
CMD npm start
