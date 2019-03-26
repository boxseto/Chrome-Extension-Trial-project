# CSCI4140_asgn2
## an image Editing Chrome Extension working with Chevereto and CamanJS

## Usage
1. Users can set the Chevereto URL in either the popup page or the options page
1. After users set the URL, the extension will notify users upon the changed URL
1. then the user can have the extension used in two ways:
  1. They can edit by having an extra button when theimage is uploaded to the site;
  1. They can Upload any files by right-clicking on the context menu, and select Upload to Chevereto

* ## Files
  * Manifest.json
    * store the extension permission, general info of the extension
  * background.js
    * the background script, to handle the context-menu add image
  * myche.js
    * the contentScript that runs on every page
    * to do the main logic in using CamanJS and modifying them in Chevereto
  * options.html and options.js
    * to enable the option page of the extension, to change where the Chevereto Server is
  * popup.html and popup.js
    * same as the options menu, only providing another platform for modification

__**Icons made by Roundicons Freebies from www.flaticon.com is licensed by CC 3.0**__
