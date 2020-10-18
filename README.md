# README

## *Introduction*

Welcome to Moviegram. This is an interactive and social Movie Review Website.

The app is supposed to be a social movie review website where users can search for movies and see the reviews about the movie written by other users as well as connect with other users with similar movie interests.

* Link to app: https://movie-gram.herokuapp.com/
## User credentials:
* Normal User:
    * Username: user Password: user
    * Username: user2 Password: user2
    * Username: username1 Password: password1
* Admin:
    * Username: admin Password admin

## Directory structure
* frontend/ is where all our frontend logic is stored
    * Seperated components into individual folders
* backend/ is where all our backend logic is stored and requires .env to be configured for local dev
    * Seperated out routes into seperate folders to not clog up the top level server
* frontend and backend are run seperately in development but for webapp purposes the root level is run.

## *Core Functionality*

User:
* Can search for movies and see reviews related to the movie from the home screen.
* Can search for movies by genre.
* Can just browse through the movies available on the database on the home screen.
* SignUp from the home screen to make an account that gives them more functionality in the application.
* SignIn to their account, if they already have one, from the home screen.
* Logged in users can follow/unfollow other users by navigating to another users profile by clicking any users profile picture on the reviews they have posted in the generic news feed. 
* Generic news feed is the place where all the reviews written by all the users are displayed. 
* Logged in users can then see the reviews posted by the people they follow on their personalized news feed. 
* The users have the ability to navigate to any other user’s profile by clicking on their profile picture in the review they posted.
* They have the ability to comment, Upvote/Downvote any review they see.
* Logged-in users can also view their own profile, where they can set a description for their profile, add their favorite movie genres, edit their profile picture, add a review of their own, check their followers and people who they follow.
* While adding a review users get an option to flag the review if it has any spoilers.
* Logged in users also have the ability to search for movies by name and also by genre.


Admin:
* An admin is just another user on the database with some extra functionality.
* The admin has the ability to remove any review from the database if it finds the review to be inappropriate. 
* Each review on the admin's dashboard is displayed with a unique button for the admin to remove the review from the database.
* The admin can also add new movies to the database. 
* When adding a movie to the database, the admin needs to provide a url for the movie's poster. The image url can be copied from the internet.
* The admin is also a user so it can also view all the reviews in the database and follow/unfollow other people.

Review:
* Every review has an upvote and downvote button alongside with the number of upvotes and downvotes for that review are displayed.
* Reviews also have a see comments button that shows the number of comments on that review and it also displays on the review header if there are any spoilers.
* There are 3 types of reviews in this app, Normal user reviews, Generic user reviews and admin reviews.
* Normal user reviews are used on the user's news feed and user profile for when a user is logged into an app. These reviews allow the logged in user to vote and comment since he/she is logged in.
* Generic user reviews are used on the All Reviews page where even reviews of people who aren't you friends are displayed so you cannot comment or vote on any reviews of this type in the all reviews page.
* Generic reviews are also used for movie pages. 
* Admin reviews are used for the admin dashboard as they have the remove review functionality.
* Each review also has the profile picture of the user that wrote the review and you can click on this picture to redirect yourself to that users profile., however you can only click on a reviews user picture if ypu are a logged in user.
* When the See Comments button in a review is clicked it displays a modal box that shows the reviews and depending on if you are a logged in user or not it lets you comment on the review.

Movie:
* You can find links to movies in many different places. Navigating to a movie can be done through links in Reviews, links on the landing page, through the search bar, and etc. For ex. you can click on the movies name in a review or the learn more button in the home page on a movie card.
* Each Movie has a picture of the poster with details about the movie
* If a person is logged in, they can vote for the movie (Up or Down)
* Reviews appear under each movie on the movie's detail page

Genre:
* Users can conveniently search for movies by Genre using the Genre search bar 
* Genre Page displays all the movies of the given genre and lets you navigate to the movie

Sessioning:
* When a user is logged in, the current user is stored on a session cookie
* When certain API routes are called, a sessionchecker is used to verify that the current user is allowed to use that route.
* When a person logs out, the session cookie clears the current user.
* Frontend routes check the cookie to see if a user is logged in and redirect the user to the appropriate route. *For ex.* User is already logged in, so /signup redirects to /newsfeed 

Extra Functionalities:
* The home screen allows the any user to browse through the movies in our database which have been showcased on home screen once you scroll down. The movies are shown as catchy flash cards. 
* The users have an option to navigate to the movie's page while reading a review about it. It is done by simply clicking on the name of the movie.
* When a user searches for any movies or navigates to a movie's page the user is also showed the reviews written by other people about the movie.
* The logged in users have an option of viewing all the reviews in the database. That is, a person can view the reviews written by every other person on the database via the global news feed.
* The reviews could get a lot of comments by other users which could occupy a lot of real estate. We have implemented floating models which display all the comments on a review to overcome the issue.
* Any review that has a spoiler also shows a spoiler warning on top of the review as an alert to other readers that this review contains spoilers. The spoiler value of the review is set when the user clicks a spoiler checkbox in the add review page to note that their review contains spoilers.

## How to use:

* Once you open the URL of our web app you will be directed to the home screen.
* Here, you have the ability to search for movies by name or by genre, you could browse through all the movies in the database here and you have an option of signing in if you have an account or signing up for one.
* While browsing movies if you hit the learn more button on any movie and it will direct you to that movie’s page which has more details about the movie and also the reviews about the movie.
* If you hit the Login/Signup button it will direct you to the login page where you also have an option to signup for an account.
* Once logged in, you have a menubar at the top of the page which helps you navigate between all the views. 
* The initial view is that of your personalized news feed which displays the reviews of the movies written by the people you follow.
* The second icon on the menu bar navigates you to your own profile where you have the options of editing description for your profile, editing your favorite movie genres, editing profile picture, add a review of your own, check your followers and people who you follow.
* Users can also click on any other user’s profile picture to visit their profile.
* The third icon on the menu bar navigates you to the global news feed which displays the reviews written by all the users in the database.
* The fourth icon on the menu bar allows you to log out of your account, navigating you back to the home screen.
* If the admin is logged in, it has an extra icon on the menu bar, the first one, which navigates you to the admin’s dashboard. 
* The admin’s dashboard allows the admin to view all the reviews written by all the users in the database and gives the admin the power to remove any review from the database if it finds the review to be inappropriate.
* The admin’s dashboard also allows it to add new movies to the database by clicking the Add Movie button at the top.



## Routes:

* We have divided our routes for each component based on their functionality. That is, each route has its own JS file and the method calls for each of them are made in the index.js file of that particular component.

### Frontend Routes
* GET / Gives you the landing page
* GET /login Gives you the login page
* GET /signup Gives you the signup page
* GET /newsfeed Shows the authenticated user's newsfeed
* GET /userprofile Shows the logged-in user's profile
* GET /profileview/:id Shows the profile of a user - can be only used if logged in
* GET /movie/:id Shows the movie of the corresponding id.
* GET /genre/:genre Shows the genres page for the corresponding genre (case sensitive)
* GET /admin Gives you the admin dashboard where the admin can remove reviews and add new movies
### Admin Routes:
* GET /api/admin/all_reviews 
    * Returns all the reviews existing in the database. 
* DELETE /api/admin/remove_review/ 
    * Removes a review from the database
    * JSON BODY Includes:
        * username: String
        * movie: String
* POST api/admin/add_movie 
    * Adds a new movie to the database.
    * JSON BODY Includes:
        * title: String
        * director: String
        * stars: Array
        * description: String
        * genres: Object
        * imgsrc: String

### Login Routes
* GET /api/login with JSON body that contains username and password
    * Will send the current user if successful, otherwise sends 400 error code
### Signup Routes
* POST /api/signup with JSON body containing all the necessary params
    * Params include: 
        * email
        * username
        * password
        * genres (JSON object with key:value being the genre and a boolean value, true if it is a favorite genre)
        * image_url (profile pic)
    * 400 error code for badly formatted bodies, 500 for server errors

### Session Routes
* GET /api/session
    * Returns currentUser on the session cookie if logged in
    * 401 Error code otherwise
* GET /api/session/logout
    * Destroys session cookie



### User Routes
* GET /api/users/
    * Returns all the registered users in the database
* GET /api/users/get_followers/:id
    * Returns the followers of the user with the given   id
* GET /api/users/get_friends/:id
    * Returns the people a user with username id is following
* GET /api/users/:id
    * Returns a user with the given username id
* PUT /api/users/user_update_description/:username
    * Update the description of user with given username
    * JSON BODY Includes:
        * newDescription: String 
* PUT /api/users/user_update_favoriteGenres/:username
    * Update the favorite genres of user with given username
    * JSON BODY Includes:
        * favoriteGenres: Object (JSON object with key:value being the genre and a boolean value, true if it is a favorite genre)
* PUT /api/users/user_update_follow/
    * Update users followers or following list depending on the body parameter isFollowers
    * If isFollowers = True, update Followers property of the user
    * If isFollowers = False, update Following property of the user
    * JSON BODY Includes:
        * username: String
        * isFollowers: Boolean
        * followers: Array of strings

### Movie Routes:
* POST /api/movies/movie/
    * Adds new movie to db
    * Only admin can do, session checker prevents normal users from doing this action
    * JSON body:
        * title: String
        * director: String
        * stars: [String]
        * description: String
        * genres: Object - key value pairs"String:Boolean", where string is the genre and boolean is true if the movie is of that genre.
        * imgsrc: String (imageUrl)
* PATCH /api/movies/add_upvoter/:id/:username
    * Session is checked for this route
    * Increases vote count for respective movie id and username. Adds username to list of upvoters.
    * Params:
        * id - String
        * username - String
* PATCH /api/movies/add_downvoter/:id/:username
    * Session is checked for this route
    * Decreases vote count for respective movie id and username. Adds username to list of downvoters.
    * Params:
        * id - String
        * username - String
* GET /api/movies/movie/:id
    * Returns movie by movie_id
* GET /api/movies/keypairs
    * Returns the title and movie_id pairs
* GET /api/movies/
    * Returns all the movies
* GET /api/movies/genre/:id
    * returns all the movies for a specific genre
* GET /api/movies/genre/
    * returns all the movie genres
* GET /api/movies/vote/:id/:upvoter
    * id - movieid, upvoter - username
    * Returns json body
        * thumbUp/thumbDown is true if the user upvoted or downvoted, false otherwise
* GET /api/movies/rating/:id
    * Returns number of upvotes and downvotes for specified movie id


### Images Routes
* POST /api/Images/upload_image/
    * Uploads the provided image to the online cloudinary server and returns the image_url obtained from the cloudinary server.
    * JSON BODY Includes:
        * ImageForm from which the file's path is obtained
* GET /api/Images/:user_id
    * Returns the image_url of a user with the given username user_id
* PUT /api/Images/:user_id
    * Updates the image_url property of a user with the given username user_id and uploads that image to the cloudinary server online and returns user Object
    * JSON BODY Includes:
        * ImageForm from which the file's path is obtained 

### Reviews Routes 
* PATCH /api/reviews/add_comment/:id
    * Uses a PATCH request to add a new comment object to the array of comments for a review with id “:id”.
    * JSON BODY Includes:
        * username: String,
		* date: String,
        * content: String
* POST /api/reviews/add_review
    * Adds a new review object as a document in the reviews collection using a post request.
    * JSON BODY Includes:
        * username: String,
        * movie_title: String,
        * content: String,
        * spoilers: Boolean,
        * comments: Array of Objects,
        * upvotes: Number,
        * downvotes: Number,
        * upvoters: Array of Strings (usernames),
        * downvoters: Array of Strings (usernames),
        * date: String,
        * movie_id: Number
* PATCH /api/reviews/add_downvoter/:id/:username
    * Adds the user “:username” as a downvoter by adding him/her to the array of downvoters in a review using a patch request and increments the number of downvotes for the review by 1.
* PATCH /api/reviews/add_upvoter/:id/:username
    * Adds the user “:username” as an upvoter by adding him/her to the array of upvoters in a review using a patch request and increments the number of upvotes for the review by 1.
* GET /api/reviews/
    * Returns a list of all the review objects from the database.
* GET /api/reviews/downvoters/:id
    * Returns a list of all the users that have downvoted that review with id “:id”.
* GET /api/reviews/upvoters/:id
    * Returns a list of all the users that have upvoted that review with id “:id”.
* GET /api/reviews/:movie_id/movie_id
    * Returns the list of reviews that were written for the movie with id ":movie_id".
* GET /api/reviews/:movie_title/movie_title
    * Returns the list of reviews that were written for the movie with title ":movie_title".
* GET /api/reviews/user_reviews/:username
    * Returns a list of reviews written by the user ":username".
* GET /api/reviews/:id
    * Returns the review object that has a review id of “:id”.





