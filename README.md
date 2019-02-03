### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Requirements:
+ Node.js v6 or higher
+ .NET Core 2.2 runtime

Commands to get up and running from console:

1) Change to the ReviewManagement subfolder

2) Start the backend with
        dotnet run

This will automatically populate a SQLite DB

3) From a new console, cd into the ClientApp folder and run
        npm install
        npm start

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

- New reviews should use the current date
- Make it not ugly
- Add more tests on front end
- Add more tests on back end
- Add Customer ability to edit a review to a product
- Add Customer ability to delete their own review for a product
- Add authentication
- Allow Vendor to reply to customer and update state
- Deploy
