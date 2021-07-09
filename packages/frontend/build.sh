docker build -t build-wireframe .
docker run --rm -v $(pwd)/build/:/app/build/ build-wireframe


