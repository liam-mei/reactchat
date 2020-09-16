# reactChat
experiment to test out react with socket.io and regular http connections.

pages

login page that uses http

chat page

1. Todo


6. project
7. project
8. project
9. practice project?
   1.  Home Page Styling
   2.  Login Styling
   3.  Register Styling
10. Project
11. LP
12. LP
13. LP
14. LP
15. asd
16. asdf
17. Interview


Image by{" "}
      <a href="https://pixabay.com/users/Tumisu-148124/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3012138">
        Tumisu
      </a>{" "}
      from{" "}
      <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3012138">
        Pixabay
      </a>

currently, socket connection is created when app is loaded before
someone logs in. This is not optimal on a security standpoint, as you
have a socket connection before you have a token. In addition, the
socket connection is only created when app loads.  This poses a
problem when the server disconnects the socket connection and you want
to log in.  The app would then have no way to create a socket
connection other than by refreshing app.

We should move the socket creation to the login endpoint.  That way,
we can have new sockets without having to reload app.  Also use
context to store socket connection.