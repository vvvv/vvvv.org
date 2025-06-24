# Community App for the vvvv.org

## Help Texts for the Profile Form:

 - `/community-app/frontend/src/components/profile/HelpTexts.js`


## How to Build

### 1. Setup

`npm run i`

### 2. Add symbolic links to the parent's css and scss folders:

external\scss <<===>> ***\assets\scss
external\css <<===>> ***\assets\css

```
mklink /d external\scss SOURCE\scss
```

1. create directory external
2. cd external
3. mklink /d scss SOURCE\scss
4. mklink /d css SOURCE\css

### 3. Build

`npm run build`

This will build the app and copy its files into the `/static/js/vue/`, so that the Hugo will pick them up on the next Hugo build.