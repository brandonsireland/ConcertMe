# Concert Me
## Concert Me is a Nodejs application that relies on the Spotify, TicketMaster and Google API's to bring your favorite artist's concerts in full view.
### The concept of this app was predicated on the issue with needing to painstakeingly check if artists were playing individually.

This app, in turn, takes your top spotify artists and check's the ticketmaster api to see if any of those artists are playing locally and displays it in map on your own custom dashboard. 


**Major technologies in use:**
- [Nodejs](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [Passport](http://www.passportjs.org/)
- [Sessions](https://github.com/expressjs/session)
- [Handlebars](https://github.com/expressjs/session)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com). 

Take a look at the package.json to get a better idea of whats in use at this moment.

**Features to come:**
- Date range support.
- Location range support.
- Price range support.
- Facebook and Twitter login.
- Manual addition/removal of artists.
- Other music app support such as iTunes or Google Play depending on API capabilities.

This project is very much in development and is very much a personal project and isn't of use to anyone at the moment. However, feel free to clone and play around with it. You will be required to have a config folder containing files for the db connection, google maps, passport, spotify and ticketmaster api keys. If you have any questions, feel free to contact me.