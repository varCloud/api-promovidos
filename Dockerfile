FROM node:12  

WORKDIR /WsMvnoApi

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "start"]

# heroku login
# docker ps
# heroku container:login
# heroku container:push web -a envnac-ws-api
# heroku container:release web -a envnac-ws-api