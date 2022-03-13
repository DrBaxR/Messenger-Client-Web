# Messenger Web Client

![image](https://user-images.githubusercontent.com/28231703/118353753-5f9cac80-b570-11eb-8207-1fd438ca0671.png)

Web client of an instant messaging application that was made with Angular. List of things you can do using it:
- Creating an account
- Viewing your (and other people's) profile
- Editing your profile (at the moment, only changing the username)
- Creating groups
- Adding users to groups
- Deleting groups
- Sending messages (obviously)
- Viewing messages in an infinite scrolling fashion
- Reseting your password

With this being said, there are also a couple of things that **could be improved**:
- User contacts list
- A user that did not create a group should not be able to delete it
- Users should be able to be removed from a group
- A way to also send files besides text messages
- Better state management (using [NgRx](https://ngrx.io/docs))

# Contributing

If you want to contribute to this project, just create a fork, add whatever you want and then make a pull request. If you want more details about contributing, they can be found [here](https://github.com/DrBaxR/Messenger-Server), in the README of the server's repo. 

# Only trying out the application

~~In case you only want to check out the application, you can run it locally via [Docker](https://www.docker.com/) (if you have it installed on your machine), by using the command ```docker run -dp 80:80 drbaxr/messenger-web```.~~

~~If you don't have Docker installed (or just don't want to run the application locally), it's also hosted on [GCP](https://cloud.google.com), so you can also access it [here](https://messenger-web-pkfomy4bva-lm.a.run.app/).~~

Since free hosting period on GCP expired you will have to run both the server and the web app locally.

# Dependencies

Here is a list of the libraries that were used (besides the ones that are included within Angular):
- [NgBootstrap](https://ng-bootstrap.github.io/)
- [@stomp/ng2-stompjs](https://www.npmjs.com/package/@stomp/ng2-stompjs)
- [ngx-emoji-picker](https://www.npmjs.com/package/ngx-emoji-picker)
- [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll)
