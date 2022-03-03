cd ../
git reset --hard
git pull
yarn
yarn build

rm -rf /var/www/examples
mv ./dist /var/www/examples

pm2 restart all
