### Review Management

Commands to get up and running:

If using Visual Studio 2017

1) double-click the VSDebug.bat file

2) load the sln

3) click Start

OR

1) If running from the console


* From Windows, run

        VSDebug.bat


* From Mac or Linux, run 

        npm install
        webpack --config webpack.config.js
		webpack --config webpack.config.vendor.js
		dotnet restore

2) Set mode to Development by setting the environment variable ASPNETCORE_ENVIRONMENT=Development

3) The following command will start the website:

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