FROM alpine
MAINTAINER Johan Stokking <johan@thethingsnetwork.org>
RUN apk --update --no-cache add ca-certificates nodejs
RUN npm install -g --unsafe-perm node-red
RUN npm install -g node-red-contrib-ttn
EXPOSE 1880
WORKDIR /root
CMD ["/usr/bin/node-red"]
