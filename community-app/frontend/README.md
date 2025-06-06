Add symbolic links to the parent's css and scss folders:

external\scss <<===>> ***\assets\scss
external\css <<===>> ***\assets\css

```
mklink /d external\scss SOURCE\scss
```

1. create directory external
2. cd external
3. mklink /d scss SOURCE\scss
4. mklink /d css SOURCE\css