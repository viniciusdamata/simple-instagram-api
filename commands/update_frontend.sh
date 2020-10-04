cd $(dirname $0)
cd ..
mkdir frontend
git clone https://github.com/viniciusdamata/simple-instagram-frontend.git ./frontend
cd frontend
touch .env
echo "SKIP_PREFLIGHT_CHECK=true" >>.env
yarn
yarn build
cd ../
rm -rf public
mv ./frontend/build public
rm -rf frontend
