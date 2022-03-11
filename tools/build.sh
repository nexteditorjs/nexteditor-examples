cd ../
git reset --hard
git pull
rm -rf ./node_modules
yarn
yarn build

rm -rf /var/www/examples
mv ./dist /var/www/examples

cd ../nexteditor-sharedb-server
git reset --hard
git pull
yarn


pm2 restart all
