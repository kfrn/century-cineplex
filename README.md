The **Century Cineplex** is a historical movie app that gives you information about the films of a hundred years ago.

Working from the current date, the app scrapes [IMDb](http://www.imdb.com/) to grab the URLs of all of the films released in the same month a century ago.  
After processing to extract the IMDb ID for each film, each unique ID is passed to the [OMDb API](https://www.omdbapi.com/), essentially a third-party IMDb API (since IMDb don't have their own API).  
The OMDb API pulls basic data (country, director, cast, genres, etc) on each film, and this information is saved into a database.

The node modules used to create the **Century Cineplex** include [Cheerio](https://www.npmjs.com/package/cheerio), [Express](https://www.npmjs.com/package/express), [Handlebars hbs](https://www.npmjs.com/package/hbs), [Knex](https://www.npmjs.com/package/knex), [OMDb](https://www.npmjs.com/package/omdb), and [Superagent](https://www.npmjs.com/package/superagent).

Try it out [on Heroku](http://century-cineplex.herokuapp.com/)!
