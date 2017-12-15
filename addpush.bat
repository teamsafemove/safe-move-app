@ECHO OFF
git add *
git commit -m "%*"
git push
gir push heroku master