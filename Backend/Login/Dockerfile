FROM openjdk:11
ADD target/login-docker.jar login-docker.jar
EXPOSE 8098
ENTRYPOINT ["java","-jar","login-docker.jar"]