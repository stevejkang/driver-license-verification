FROM node:alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build && npm prune --production

FROM node:alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
EXPOSE 3000
CMD ["yarn", "start:prod"]
