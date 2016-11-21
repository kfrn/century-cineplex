The **Century Cineplex** is a historical movie app that gives you information about the films of a hundred years ago.

Working from the current date, the app scrapes [IMDb](http://www.imdb.com/) to grab the URLs of all of the films released in that month a century ago. After processing to extract the IMDb ID for each film, each unique ID is passed to the [OMDb API](https://www.omdbapi.com/), essentially a third-party IMDb API (since IMDb don't have their own API). The OMDb API pulls basic data (country, director, cast, genres, etc) on each film. 
