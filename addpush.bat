@ECHO OFF
git add *
git commit -m "%*"
git push
git push heroku master
heroku config:set NODE_ENV=heroku