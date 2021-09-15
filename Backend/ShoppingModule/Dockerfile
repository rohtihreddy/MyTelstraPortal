FROM openjdk:11
ADD target/shop-docker.jar shop-docker.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","shop-docker.jar"]