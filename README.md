# KardashevOneTestServer

Get started

1. Clone repository
2. cd into working directory.
3. "npm install"
4. "node index"

A server will now be running on localhost:3000; it initializes firebase and sets up
POST route to /test, who's body contains the clients fcm token.  A push message with a payload
is then sent back to that client. 