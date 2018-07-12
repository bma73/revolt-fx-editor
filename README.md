![logo](https://samples.revoltfx.electronauts.net/assets/rfx-logo.png)

# RevoltFX Editor

Visual editor for the [RevoltFX](https://github.com/bma73/revolt-fx) particle and effect system built with VueJS.

### Check out the [online version](https://editor.revoltfx.electronauts.net)

![editor](https://samples.revoltfx.electronauts.net/assets/editor.png)

### Have a look at the [samples](https://samples.revoltfx.electronauts.net)

![samples](https://samples.revoltfx.electronauts.net/assets/samples.png)

 
## Assets

#### Filter
The best way to provide the effect images is using a spritesheet. If you only want to a range of images in your spritesheet to be used by RevoltFX, prefix them with a pattern,  
**e.g. "fx-" (fx-smoke.png, fx-light01.png etc.)**

You than can specify this pattern in the editor's "New Bundle" dialog.

![editor](https://samples.revoltfx.electronauts.net/assets/newbundle.png)

Only images with this pattern in their name will be used.

### Movieclips (aka AnimatedSprites)
RevoltFX lets you use Movieclips (AnimatedSprites) as particle components. To let editor the automatically detect the according images follow this naming convention:

#### mc\_(name)\_counter.png

**mc\_fx-smoke\_01.png  
mc\_fx-smoke\_02.png  
mc\_fx-smoke\_03.png  
mc\_fx-smoke\_04.png   
...**


## Build Setup

``` bash
# Install dependencies
npm install

# Serve with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build
```

