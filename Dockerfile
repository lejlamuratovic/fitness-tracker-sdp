FROM maven:3.8.5-openjdk-17 as build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/fitness-tracker-0.0.1-SNAPSHOT.jar fitness-tracker.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","fitness-tracker.jar"]