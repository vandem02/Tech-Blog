# The Daily \<Div\>
## A social media site by Evan Vandenberg

![deployed-screenshot](/public/images/deployedscreenshot.png)

Welcome to The Daily Div, a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. The site is hosted by Heroku, and follows the Model-View-Controller (MVC) paradigm in its architectural structure. All data is stored in a MySQL database, queried by an express server.

The site uses the following npm packages:
- `express` for the server
- `express-handlebars` for rendering views
- `express-session` for authentication
- `bcrypt` for password encryption
- `mysql2` for the MySQL database
- `sequelize`, an ODM to simplify and facilitate queries made to the database

## Deployed Heroku Link
https://next-quest-app-ede904b63665.herokuapp.com/login 