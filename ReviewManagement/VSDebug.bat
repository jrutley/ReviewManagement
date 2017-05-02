cmd.exe /c npm install
node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js
node node_modules/webpack/bin/webpack.js
set ASPNETCORE_ENVIRONMENT=Development
dotnet restore