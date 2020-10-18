NAME1=moviegram-front
NAME2=moviegram-back
# SETUP
# heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v83 -a $NAME1
# heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v83 -a $NAME2
# heroku buildpacks:add -a $NAME1 https://github.com/heroku/heroku-buildpack-multi-procfile
# heroku buildpacks:add -a $NAME2 https://github.com/heroku/heroku-buildpack-multi-procfile

# Setting the proc files
# heroku config:set -a $NAME1 PROCFILE=frontend/Procfile
# heroku config:set -a $NAME2 PROCFILE=backend/Procfile

# DEPLOYMENT COMMANDS
# git push https://git.heroku.com/$NAME1.git master
git push https://git.heroku.com/$NAME2.git master
