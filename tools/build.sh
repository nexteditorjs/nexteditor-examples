cd ../
echo rest code
git reset --hard
echo pull
git pull
# rm -rf ./node_modules

echo stop nginx and mysql
service nginx stop
service mysql stop

echo install dependencies
yarn

echo build examples
yarn build

echo copy and move examples
FILE=./dist
if [ -d "$FILE" ]; then
  rm -rf /var/www/examples
  mv ./dist /var/www/examples
fi

echo refresh sharedb server
cd ../nexteditor-sharedb-server
git reset --hard
git pull
yarn
tsc

echo refresh yjs
cd ../nexteditor-yjs-server
git reset --hard
git pull
yarn

echo restart node project
pm2 restart all

echo start nginx and mysql
service nginx start
service mysql start
