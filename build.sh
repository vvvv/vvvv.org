cd vvvv.org
git fetch
git checkout -f origin/main
hugo --buildFuture --minify --baseURL https://vvvv.org/ --cacheDir=/home/vvvv/vvvv.org/tmp
