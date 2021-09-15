FROM openjdk:11
ADD target/payment-docker.jar payment-docker.jar
EXPOSE 8086
ENTRYPOINT ["java","-jar","payment-docker.jar"]