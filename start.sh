#!/bin/bash

cd Backend/JobPortalApi/JobPortalApi

chmod +x ./mvnw   # add this line to fix permission

./mvnw clean install -DskipTests
./mvnw spring-boot:run
