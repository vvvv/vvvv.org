cd vvvv.org
git fetch
git checkout -f origin/main
hugo --buildFuture --minify --baseURL https://main.vvvv.org/ --cacheDir=/home/vvvv/main.vvvv.org/tmp
