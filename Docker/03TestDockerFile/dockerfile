# Première étape : installer Sass et compiler le fichier SCSS
FROM alpine:latest AS first
# Installer Node.js et npm (nécessaires pour Sass)
RUN apk add --no-cache nodejs npm
# Installer Sass
RUN npm install -g sass
# Copier le fichier SCSS
COPY test.scss /
# Compiler le fichier SCSS en CSS
RUN sass /test.scss /test.css

# DEUXIEME ETAPE : IMAGE FINALE ################

FROM alpine:latest
# Copier le fichier CSS compilé depuis l'étape précédente (soit l'image de base)
COPY --from=first /test.css /
# Définir la commande pour afficher le contenu du fichier CSS
CMD ["cat", "/test.css"]