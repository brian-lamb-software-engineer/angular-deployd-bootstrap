
angular-deployd-bootstrap
=========================



## Project Description
 
A SPA single page application that uses Angular for its middle tier to front
end, deployd mongodb for the back end, and is set up for service to access apis
for consumption. 

* @todo add unit tests, refactor where necessary
* @todo look into cors request for geo call
* @todo wireframe and implement a gui replacement



## Application Setup Instructions

No server needed, use deployd

### References 
* Deployd docs http://docs.deployd.com/docs/server/your-server.html
* Deployd download for mac or windows http://docs.deployd.com/docs/getting-started/installing-deployd.html. source https://github.com/deployd/deployd
* Angular docs https://docs.angularjs.org/api/ng
* Moment.js docs http://momentjs.com/docs/
* Bootstrap docs http://getbootstrap.com/getting-started/
* bootstrap-datepicker docs https://bootstrap-datepicker.readthedocs.org/en/latest/



### Deployment steps:
  

 ```bash
 # npm install -g deployd
 ```
 
* If your using linux (which has a desktop, and a browser)  to launch deployd

 ```bash
$ cd /home/user/sites/ast_deployd
$ dpd -d //if your using linux to launch deployd
 ```

 * If your using windows to to launch deployd
 
  ```bash
-  open cmd as administrator
- > cd sites/ast_deployd
-> dpd -d
 ```
 
* The application should then launch to the dashboard.  there is a link on the top right that will open the app, or you can simply use this url
http://localhost:2043

### Troubleshooting

* If you get a  mongo error, which states to use --mongo, normally that command is as follows
  ```bash
dpd -d --mongod ./pids
 ```

 
 
## Integration testing

* Download seleniuim ide firefox plugin, 
* download the button if needed, 
* open selenium
* file open main-suite.ste
* press play all



## The MIT License (MIT)

Copyright (c) Brian Lamb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
