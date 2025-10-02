# ---- Build (JDK 21 + Maven) ----
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

# ---- Runtime (JRE 21 leve) ----
FROM eclipse-temurin:21-jre
WORKDIR /app
# O Render injeta a porta em $PORT
ENV PORT=8080
# (Opcional) Flags de memória amigáveis a planos grátis:
# ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
COPY --from=build /app/target/*.jar app.jar
CMD ["sh","-c","java $JAVA_OPTS -Dserver.port=$PORT -jar app.jar"]
