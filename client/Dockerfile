FROM 451158882614.dkr.ecr.eu-west-1.amazonaws.com/node

WORKDIR /app

COPY package*.json ./

COPY . .

# Add bash
RUN npm install
RUN npm --depth 20 update --save caniuse-lite browserslist
RUN npm run build
RUN npm install -g serve


EXPOSE 3000

CMD ["serve","-s","build"]