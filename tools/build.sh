cd ../
git reset --hard
git pull
yarn build

rm -rf /var/www/examples
mv ./dist /var/www/examples
