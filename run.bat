@echo off

cd /d "%~dp0"

start "Auth Service" cmd /k "cd BackEnd\auth-service && node src\authserver.js"

start "Service" cmd /k "cd BackEnd\service && node src\app_Node.js"

start "fbi server" cmd /k "cd BackEnd\wanted-service && py server.py"

start "Gateway" cmd /k "cd BackEnd\gateway && node src\gateway.js"

start "dataService" cmd /k "cd BackEnd\dataService && node src\server.js"

pause