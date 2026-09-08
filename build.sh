cd stage.vvvv.org
git fetch
git checkout -f origin/stage
hugo --buildFuture --minify --baseURL https://stage.vvvv.org/ --cacheDir=/home/vvvv/stage.vvvv.org/tmp
