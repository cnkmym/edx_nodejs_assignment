#get all posts
curl -H "Content-Type: application/json" -X GET "http://localhost:3000/posts"

#posts post data
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"

#updates post data at specific id
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"

#gets post data
curl "http://localhost:3000/posts"

#deletes post data at specific id
curl -X DELETE "http://localhost:3000/posts/0"

#get all posts
curl -H "Content-Type: application/json" -X GET "http://localhost:3000/posts"


#init single post
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"

#get all comments
curl -H "Content-Type: application/json" -X GET "http://localhost:3000/posts/0/comments"

#posts comment data
curl -H "Content-Type: text/plain" -X POST -d 'First Sentence of Comment'  "http://localhost:3000/posts/0/comments"
curl -H "Content-Type: text/plain" -X POST -d 'Second Sentence of Comment'  "http://localhost:3000/posts/0/comments"

#updates comment data at specific id
curl -H 'Content-Type: text/plain' -X PUT -d 'New Second Comment' "http://localhost:3000/posts/0/comments/1"

#gets comment data
curl "http://localhost:3000/posts/0/comments"

#deletes comment data at specific id
curl -X DELETE "http://localhost:3000/posts/0/comments/0"

#get comment data again
curl -H "Content-Type: application/json" -X GET "http://localhost:3000/posts/0/comments"
