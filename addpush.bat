@ECHO OFF
git add *
git commit -m "%*"
git push
git push heroku master