# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /opt/app

# Copy services, ui, and docker folders into the container
COPY services services
COPY ui ui

# Install app dependencies for the "ui" folder
WORKDIR /opt/app/ui
COPY ui/package.json ui/package-lock.json ./
RUN npm install && \
    npm run build

# Switch back to the base directory
WORKDIR /opt/app
RUN apt-get update && apt-get install -y python3-pip

RUN apt update && \
    apt install -y nginx python3-venv && \
    python3 -m venv venv_services && \
    . venv_services/bin/activate && \
    pip3 install ./services


COPY docker/nginx.conf /etc/nginx/

COPY docker/start* .
RUN chmod 755 start*
CMD ["/opt/app/start.sh"]
