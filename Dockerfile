FROM node:17-alpine AS builder

WORKDIR /build

# Copy required files
COPY package*.json .
COPY tsconfig.json .
COPY src ./src

# install dependencies
RUN npm install

# Build the project
RUN npm run build

# delete typescript source files
RUN find -type f -name '*.ts' | xargs rm

FROM nginx:alpine AS production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from build stage
COPY --from=builder /build/src /usr/share/nginx/html

EXPOSE 80/tcp
