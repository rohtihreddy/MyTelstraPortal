FROM openjdk:11
ADD target/broadband-docker.jar broadband-docker.jar
EXPOSE 8088
ENTRYPOINT ["java","-jar","broadband-docker.jar"]