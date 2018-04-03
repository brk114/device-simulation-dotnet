@ECHO off & setlocal enableextensions enabledelayedexpansion

:: Note: use lowercase names for the Docker images
SET DOCKER_IMAGE="ravikumarb/physical-battery"
:: "addedBatteryData" is the latest dev build, usually matching the code in the "master" branch
SET DOCKER_TAG=%DOCKER_IMAGE%:addedBatteryData

docker push %DOCKER_TAG%

endlocal
