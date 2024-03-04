# Latest Log 
## Product Schema Changed 
We may wanna denormalize the database just for the performance.
As it is a hard duty to get prodcuts by Rating : 
- Count the rating of all products 
- Get the products ID ordered by score 
- Select those within the given range 
This approach will so long as we are performing a count and double select filtering.
**Solution** : Add a new column to the database **TotalScore** that will hold the total rating of that product and will be updated each time a new rating is added.
