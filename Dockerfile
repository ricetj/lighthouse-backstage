FROM node:14.15.4-buster

WORKDIR /tmp

RUN curl -O https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tar.xz && \
  tar -xvf Python-3.8.2.tar.xz && \
  cd Python-3.8.2 && \
  ./configure --enable-optimizations && \
  make -j 4 && \
  make altinstall

RUN apt update
RUN apt install -y mkdocs

RUN pip3.8 install mkdocs-techdocs-core

RUN pip3.8 install cookiecutter && \
  rm -rf /var/cache/apt/* /tmp/Python-3.8.2

WORKDIR /usr/src/app

COPY package.json yarn.lock lerna.json mkdocs.yml /usr/src/app/
COPY packages/app/package.json /usr/src/app/packages/app/
COPY packages/backend/package.json /usr/src/app/packages/backend/
RUN yarn install
COPY . /usr/src/app/
RUN yarn tsc
RUN yarn build

CMD ["yarn", "start"]