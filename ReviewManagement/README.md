### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Commands to get up and running:

If using Visual Studio, just load the sln and click Start

If running from the console, run 

npm install

webpack --config webpack.config.vendor.js

dotnet restore

dotnet ef database update

Set mode to Development by setting the environment variable ASPNETCORE_ENVIRONMENT=Development

The following command will start the website:
dotnet run

#### Stuff left to do:

- Show a message to the Customer if they haven't purchased any products
- Add more tests on front end  
- Add more tests on back end  
- Add Customer ability to edit a review to a product
- Select the Customer from the list instead of an input field
- Add authentication
- Add dates to seed data
- Allow Vendor to reply to customer and update state
- Deploy