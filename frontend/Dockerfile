# Build Stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

# Install dependencies including devDeps (Vite, Tailwind plugin, etc.)
RUN npm install --include=dev
# or: RUN npm ci --include=dev

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Run Vite build
RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
