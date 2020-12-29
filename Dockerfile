FROM alpine:3.7
MAINTAINER GoCD Contributors <go-cd-dev@googlegroups.com>

EXPOSE 5000

COPY . /cla-assistant
WORKDIR /cla-assistant

RUN \
  apk add --no-cache --virtual .build-deps nodejs su-exec git curl bzip2 patch make g++ && \
  adduser -S -D -G root cla-assistant && \
  chown -R cla-assistant:root /cla-assistant && \
  chmod -R g+rwx /cla-assistant && \
  su-exec cla-assistant /bin/sh -c 'cd /cla-assistant && npm install && node_modules/grunt-cli/bin/grunt build && rm -rf /home/cla-assistant/.npm .git'

USER cla-assistant
CMD ["npm", "start"]
