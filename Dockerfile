FROM node:17-alpine as builder

WORKDIR /build

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

# delete typescript source files
RUN find -type f -name '*.ts' | xargs rm

FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from build stage
COPY --from=builder /build/src /usr/share/nginx/html

EXPOSE 80/tcp
