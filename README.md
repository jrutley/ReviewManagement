### Review Management

This application allows a vendor to manage reviews for their products. It is not a production-quality application.

Commands to get up and running:

If running from the console, run 

npm install

webpack --config webpack.config.vendor.js

dotnet restore

dotnet ef database update

Set mode to Development by setting the environment variable ASPNETCORE_ENVIRONMENT=Development

The following command will start the website:
dotnet run

#### Stuff left to do:

- Add tests on front end  
- Add tests on back end  
- Wire up something on the front end to call the CustomerReviewController  
- Add Customer ability to add a review to a product
- Add Vendor ability to retrieve reviews
- Add Vendor ability to sort reviews
- Add Vendor ability to paginate reviews