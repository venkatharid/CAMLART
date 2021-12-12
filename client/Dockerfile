FROM node:16

WORKDIR /app

COPY package*.json ./

COPY . .

# Add bash
RUN npm install
RUN npx browserslist@latest --update-db

EXPOSE 3000

CMD ["npm", "start"]