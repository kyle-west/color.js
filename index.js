class Color {
  constructor (...args) {
    let [hex] = args;
    let [r, g, b] = args;
    hex = (hex[0] === '#' ? hex : '#' + hex)
    if (r !== undefined && g !== undefined && b !== undefined) {
      this.hex = Color.RGBtoHex(r,g,b)
    } else if (hex !== undefined) {
      this.hex = hex;
      ;[r, g, b] = Color.hexToRGB(hex);
    }
    this.r = r;
    this.g = g;
    this.b = b;

    this._numeric = eval(hex.replace('#', '0x'));
  }

  toString () {
    return this.hex;
  }

  static hexToRGB (hex) {
    return (hex[0] === '#' ? hex.substr(1) : hex).match(/\w\w/g).map(x => parseInt(x, 16));
  }

  static RGBtoHex (...rgb) {
    return '#' + rgb.map(c => c.toString(16).padStart(2, 0)).join('');
  }

  lighten (percent) {
    let rgb = [this.r, this.g, this.b].map(x => {
      let num = Math.floor(x + 255 * percent);
      num = num <= 255 ? num : 255;
      return num
    })
    return new Color(...rgb)
  }

  darken (percent) {
    let rgb = [this.r, this.g, this.b].map(x => {
      let num = Math.floor(x - 255 * percent);
      num = num >= 0 ? num : 0;
      return num
    })
    return new Color(...rgb)
  }
}