mkdir frontend
git clone https://github.com/viniciusdamata/simple-instagram-frontend.git ./frontend;
cd frontend;
yarn;
yarn build;
cd ../;
rm -rf public;
mv ./frontend/build  public;
rm -rf frontend;