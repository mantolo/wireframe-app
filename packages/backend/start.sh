docker network prune
docker network create --driver bridge wireframe-app
docker run --rm -d \
  --name mysql-dev \
  -v wireframe-data:/var/lib/mysql \
  --network wireframe-app \
  --network-alias mysql-db \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=wireframe \
  mysql:5.7
docker run --rm -p 5000:3000 -it \
  --name server-dev \
  -w /app \
  -v $(pwd)/:/app/ \
  --network wireframe-app \
  -e MYSQL_HOST=mysql-db \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=1234 \
  -e MYSQL_DB=wireframe \
  node:14-alpine \
  sh -c "npm install && npm run dev"