WIP!!!

The **Century Cineplex** is a historical movie app that gives you information about the films released in the current month, one hundred years ago.

The app scrapes [IMDb](http://www.imdb.com/) to grab the URLs of all of the films released in this month a century ago. After processing the resulting strings, the IMDb ID for each film is passed to the [OMDb API](https://www.omdbapi.com/), essentially a third-party IMDb API. The OMDb API pulls basic data (country, director, cast, genres, etc) on each film, and this information is saved into a database.  
From there, the database is queried in various ways to return different results.  
The Century Cineplex allows you to search by country, genre, and whether a plot summary exists - or, you can ask the app for a random film of the month! (To keep it interesting, the random film option is restricted to films that have either a poster or a synopsis).

The node modules used to create the **Century Cineplex** include [Cheerio](https://www.npmjs.com/package/cheerio), [Express](https://www.npmjs.com/package/express), [Handlebars-hbs](https://www.npmjs.com/package/hbs), [Knex](https://www.npmjs.com/package/knex), [OMDb](https://www.npmjs.com/package/omdb), and [Superagent](https://www.npmjs.com/package/superagent).

Try it out [on Heroku](http://century-cineplex.herokuapp.com/)!

Originally written with inbuilt web-scraping capabilities and database, I've since rewritten the *Century Cineplex* to pull data from my [Cinema 1917 API](https://github.com/kfrn/cinema-1917-api).
