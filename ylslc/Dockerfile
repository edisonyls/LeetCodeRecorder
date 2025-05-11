# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build the package without running tests
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-alpine
WORKDIR /app
# Copy the built jar file from the build stage
COPY --from=build /app/target/ylslc-0.0.1-SNAPSHOT.jar ./ylslc.jar
EXPOSE 8080

# Define environment variables (placeholders for default values or documentation)
ENV DATABASE_USERNAME=placeholder_username
ENV DATABASE_PASSWORD=placeholder_password
ENV JWT_KEY=placeholder

# Use an entrypoint shell script to handle environment variables
CMD ["java", "-jar", "ylslc.jar", \
     "--spring.datasource.username=${DATABASE_USERNAME}", \
     "--spring.datasource.password=${DATABASE_PASSWORD}", \
     "--jwt.secret=${JWT_KEY}"]
