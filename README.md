### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Commands to get up and running:

dotnet ef migrations add initialMigration
dotnet ef database update

dotnet restore
If running from the console, run npm install
Set mode to Development by setting the environment variable ASPNETCORE_ENVIRONMENT=Development

The following command will start the service:
dotnet run

#### Stuff left to do:

Add tests on front end
Add tests on back end
Add Customer ability to add a review to a product
Add Vendor ability to retrieve reviews
Add Vendor ability to sort reviews
Add Vendor ability to paginate reviews