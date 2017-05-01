### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Requirements: 
+ Node.js v6 or higher
+ .NET Core runtime

Commands to get up and running:

If using Visual Studio 2017

1. double-click the VSDebug.bat file, then load the sln and click Start

OR

If running from the console

1.
 a. If running from the console from Windows, run

    VSDebug.bat


 b. If running from the console from Mac or Linux, run 

    npm install

    webpack --config webpack.config.js

    webpack --config webpack.config.vendor.js

    dotnet restore

2. Set mode to Development by setting the environment variable ASPNETCORE_ENVIRONMENT=Development

3. The following command will start the website:

dotnet run

#### Stuff left to do:

- Make the CSS prettier on the customer page
- Add more tests on front end  
- Add more tests on back end  
- Add Customer ability to edit a review to a product
- Select the Customer from the list instead of an input field
- Add authentication
- Allow Vendor to reply to customer and update state
- Deploy