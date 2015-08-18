Some notes for final documentation:
After you clone the repo for Brian Lamb ast_deployd

#deploy steps

-  reference url http://docs.deployd.com/docs/server/your-server.html

-  # sudo npm install -g deployd

//if your using linux (which has a desktop, and a browser)  to launch deployd
$ cd /home/user/sites/ast_deployd
$ dpd -d //if your using linux to launch deployd

//if your using windows to to launch deployd
-  open cmd as administrator
- > cd sites/ast_deployd
-> dpd -d

website should launch to the dashboard.  there is a link on the top right that will open the app, or you can simply use this url
http://localhost:2043

if you get a  mongo error, which states to use --mongo, normally that command is as follows
dpd -d --mongod ./pids

email bl@bleedingedgewebsites