## An exercise in pagination with REST API, Google Maps and vanilla JavaScript

I wanted to re-vist pagination

Using the Fetch API, I bring in some sample data from [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

Next I styled a 'card' to display the fetched data. While doing this I noticed that the user's data included geographical coordiantes, so why not add Google maps to the cards.

The coordiantes are of course bogus, but they are distinct. Most of them are in the middle of some ocean or Antarctica. If you look closely you will see that each map is distinct.

The challenge with the maps was to be able to display more that one map per page.

After displaying the fetched data (with maps) it was time for the pagination. If you want to change the number of cards per page, you can change ```var numberPerPage = 2;``` in pagination.js.

## How to get started

You will need to get an API key for Google Maps. If you don't know how to get one, a quick search on Google will show you how to get one.

Once you have an API key, you need to add it to the bottom of index.html replacing ```[YOUR_API_KEY_HERE]``` with your own API key.

If you are using VS Code, fire up index.html with the Go Live extension, otherwise just open up index.html in a browser window. Enjoy!