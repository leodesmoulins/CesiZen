# Dockerfile Back
FROM maven:3.9-eclipse-temurin-17

# Créer le dossier de travail
WORKDIR /home/app

# Copier le pom pour récupérer les dépendances offline
COPY pom.xml .

# Télécharger les dépendances Maven
RUN mvn dependency:go-offline -B

# Copier tout le code source
COPY . .

# Commande de lancement Spring Boot
CMD ["mvn", "spring-boot:run"]