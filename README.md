# gakusei-admin-fe #
### Testing ###
#### Setup ####
To be able to test the features that require authorization, create a file called `secrets.json ` in `gakusei-admin-fe` directory (top level). Make sure it is written on the following format:
```javascript
{
  "username": "<adminuser>",
  "password": "<password>"
}
```
#### Running tests ####
* First make sure the frontend is running, if not, execute `npm start`.
* To run all tests (e2e + unit), execute `npm run test`.
* To run a single test, execute `./node_modules/.bin/nightwatch {path/to/test/testfile.js}`.

#### Writing tests ####
For documentation on how to write unit and e2e tests using Nightwatch, visit http://nightwatchjs.org/guide.

From the guide referenced it is not immeadiately obvious which types of assertions and commands are available for Page Objects. Visit https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API for a list of available Page Object commands.
