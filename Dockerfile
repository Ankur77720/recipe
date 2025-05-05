FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./
RUN npm run build


FROM node:18-alpine as backend

WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ ./



COPY --from=frontend-builder /app/frontend/dist ./public


EXPOSE 3000


CMD ["node", "server.js"]