cd ../
git reset --hard
git pull
# rm -rf ./node_modules
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


pm2 restart all
