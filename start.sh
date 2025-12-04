#!/bin/bash

cd Backend/JobPortalApi/JobPortalApi   # correct path

chmod +x ./mvnw   # give permission

./mvnw clean install -DskipTests
./mvnw spring-boot:run
