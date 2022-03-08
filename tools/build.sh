cd ../
git reset --hard
git pull
rm -rf ./node_modules
yarn
yarn build

rm -rf /var/www/examples
mv ./dist /var/www/examples

pm2 restart all
