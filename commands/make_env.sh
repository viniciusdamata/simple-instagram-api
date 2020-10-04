echo "Enter the environment for production"
echo $0
cd $(dirname $0)

echo "enter BASE_URL"
read PROD_BASE_URL

echo "enter IMGUR_CLIENT_ID"
read PROD_IMGUR_CLIENT_ID

echo "enter MONGO_DB_URI"
read PROD_MONGO_DB_URI

echo "enter ENV"
read PROD_ENV

echo "enter PORT"
read PROD_PORT

echo "enter CORS_ORIGIN"
read PROD_CORS_ORIGIN

touch ../.env.production

echo "
BASE_URL=$PROD_BASE_URL\nIMGUR_CLIENT_ID=$PROD_IMGUR_CLIENT_ID\nMONGO_DB_URI=$PROD_MONGO_DB_URI\nENV=$PROD_ENV\nPORT=$PROD_PORT\nCORS_ORIGIN=$PROD_CORS_ORIGIN" >>../.env.production

echo "Enter the environment for development"

echo "enter BASE_URL"
read DEV_BASE_URL

echo "enter IMGUR_CLIENT_ID"
read DEV_IMGUR_CLIENT_ID

echo "enter MONGO_DB_URI"
read DEV_MONGO_DB_URI

echo "enter ENV"
read DEV_ENV

echo "enter PORT"
read DEV_PORT

echo "enter CORS_ORIGIN"
read DEV_CORS_ORIGIN

touch ../.env.development
echo "
BASE_URL=$DEV_BASE_URL\nIMGUR_CLIENT_ID=$DEV_IMGUR_CLIENT_ID\nMONGO_DB_URI=$DEV_MONGO_DB_URI\nENV=$DEV_ENV\nPORT=$DEV_PORT\nCORS_ORIGIN=$DEV_CORS_ORIGIN" >> ../.env.development
