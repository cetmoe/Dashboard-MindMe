DIR="/var/www/cetmoe.xyz/mindme"
ssh -t cetmoe@cetmoe.xyz "rm -r $DIR && mkdir $DIR"

echo "Copying React build to server."
yarn run build

scp -r ./dist/* cetmoe@cetmoe.xyz:/var/www/cetmoe.xyz/mindme