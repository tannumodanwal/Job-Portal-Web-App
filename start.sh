#!/bin/bash
cd Backend/JobPortalApi/JobPortalApi
./mvnw clean install -DskipTests
./mvnw spring-boot:run
