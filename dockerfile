FROM node:latest

RUN apt-get install -y python3 make gcc g++ 

# Install google-chrome-stable
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*
# Create a user with name 'app' and group that will be used to run the app
RUN groupadd -r app && useradd -rm -g app -G audio,video app

WORKDIR /home/app

#username and password to airmaestro
ENV username 
ENV password 
# debug env "debug download router db"
# ENV DEBUG "debug download router db"

# Copy and setup your project 

COPY package.json /home/app/package.json

COPY yarn.lock /home/app

RUN yarn install --frozen-lockfile

COPY . /home/app

RUN yarn 

EXPOSE 4000
EXPOSE 3000

# Give app user access to all the project folder
RUN chown -R app:app /home/app 
RUN chmod -R 777 /home/app

USER app

CMD ["/bin/sh", "start.sh"]
