### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Requirements: 
+ Node.js v6 or higher
+ .NET Core runtime

Commands to get up and running:

If using Visual Studio 2017

1) Change to the ReviewManagement subfolder

2) double-click the VSDebug.bat file

3) load the sln

4) click Start

OR

If running from the console

1) Change to the ReviewManagement subfolder


* From Windows, run

        VSDebug.bat

* From Mac or Linux, run 

		sh VSDebug.sh

2) The following command will start the website:

        dotnet run

For development purposes, this employs hot reload, so that we don't need to continually rebuild.
		
##### Testing

Controller tests:
From within Visual Studio, navigate to Test->Run->All Tests

Otherwise, open a console to the ReviewManagement.Test folder and type
		dotnet test

or
		dotnet watch test
to continually rebuild after file changes
		
Service and Web tests:

Open a console to the ReviewManagement folder and type
		npm test

This will set up a hot loaded test environment

#### Stuff left to do:

- Make the CSS prettier on the customer page
- Add more tests on front end  
- Add more tests on back end  
- Add Customer ability to edit a review to a product
- Select the Customer from the list instead of an input field
- Add authentication
- Allow Vendor to reply to customer and update state
- Deploy
