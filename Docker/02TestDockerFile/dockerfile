FROM alpine:latest
LABEL version="1.2" arch="x86-64"
ENV APP_TYPE="FRONTEND"
RUN apk add --no-cache wget bash && \
  adduser -D user1 && \
  mkdir -p /data && \
  chown user1:user1 /data

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ADD archive.rar /data
WORKDIR /data
USER user1
CMD ["Bonjour"]
ENTRYPOINT ["/entrypoint.sh"]