cd ../
git reset --hard
git pull
# rm -rf ./node_modules

service nginx stop
service mysql stop

yarn
yarn build

FILE=./dist
if [ -d "$FILE" ]; then
  rm -rf /var/www/examples
  mv ./dist /var/www/examples
fi

cd ../nexteditor-sharedb-server
git reset --hard
git pull
yarn
tsc

cd ../nexteditor-yjs-server
git reset --hard
git pull
yarn


pm2 restart all

service nginx start
service mysql start
