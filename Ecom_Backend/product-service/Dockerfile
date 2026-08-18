# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY product-service/pom.xml product-service/

RUN mvn -pl product-service -am dependency:go-offline -B

COPY product-service/src product-service/src

RUN mvn -pl product-service -am clean package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/product-service/target/*.jar app.jar
EXPOSE 4000
ENTRYPOINT ["java", "-jar", "app.jar"]