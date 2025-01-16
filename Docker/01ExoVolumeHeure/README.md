# Construction de l'image
docker build -t alpine-date-logger .

# Exécution du container avec montage du volume
docker run --rm -v /c/Users/YvanDOUENEL/docker/volumes:/data alpine-date-logger