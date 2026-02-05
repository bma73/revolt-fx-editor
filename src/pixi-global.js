import * as PIXI from 'pixi.js'
if (typeof window !== 'undefined') {
  window.PIXI = PIXI
  const origGetContext = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = function (type, attributes) {
    if (type === '2d') {
      attributes = { ...attributes, willReadFrequently: true }
    }
    return origGetContext.call(this, type, attributes)
  }
}
