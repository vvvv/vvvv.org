Source of [vvvv.org](http://vvvv.org)

## Adding a Blog post

- Fork this repository
- Browse [the blog folder](https://github.com/vvvv/vvvv.org/tree/main/content/blog/) to see how existing posts are written
- Create a new folder in the `\{currentYear]\News` or `\{currentYear]\Dates` folder (depending on the type of your post) with a short name describing the post (that folder name is just for the folder structure, no other relevance)
- The only file that is mandatory in your folder is the `index.md` file. Best copy one over from another blogpost and modify it
- For posts of type `date` you need to enter from- and to- dates in unix time, which can be converted to from date using e.g. this [date -> timestamp converter](https://dqydj.com/unix-time-to-date-converter/)
- To preview your post locally, see the section "Local Build" below
- Finally make a pull-request from your fork to this repo

### Shortcodes
For embedding external media use these short codes:

* Mastodon: `{{< mastodon "mastodon.xyz/@vvvv/109598445063555699" 550 >}}` Parameters: Link [Height (default=550)]
* Pixelfed: `{{< pixelfed "pixelfed.social/p/madewithvvvv/509678388578111219" 550 >}}` Parameters: Link [Height (default=550)]
* Vimeo: `{{< vimeo 761078720 >}}` Parameters: Vimeo ID
* Youtube `{{< youtube 761078720 >}}` Parameters: Youtube ID
 
## Local build:
* [Download Hugo Extended](https://github.com/gohugoio/hugo/releases/tag/v0.145.0), **Version 0.145**, unzip and place that into your programs folder,
* Add it to your path (environment variables)
* Powershell: 
  * `cd C:\dev\vvvv.org`
  * `hugo server`
* Open http://localhost:1313/ in your browser

To run in the browser and to be able to access the site from the same local wifi (eg. checking on mobile), run hugo with:
`hugo serve --bind 0.0.0.0 --baseURL http://IP:1313` where IP is your IP from `ipconfig`
