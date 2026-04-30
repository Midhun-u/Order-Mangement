ARG node_version=node:25-alpine

FROM ${node_version} AS builder

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM ${node_version} AS runner

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --omit=dev

COPY --from=builder /app/dist /app/dist
COPY ./.env /app/

EXPOSE 5000

CMD [ "npm" , "start"]