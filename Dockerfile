FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

ENV NUXT_ENV_API_URL=https://api.github.com
ENV NUXT_ENV_GH_TOKEN=a1a3d9122599427ae460555031910ab60cced54d
ENV NUXT_ENV_TIMEOUT_LIMIT=15000

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
