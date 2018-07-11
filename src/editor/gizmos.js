import * as PIXI from 'pixi.js';


export class Gizmos {

  static getCreatorGizmo() {
    return new CreatorGizmo();
  }

  static COLOR = 0x409EFF;

  static getOriginGizmo() {
    const g = new BaseGizmo();
    g.lineStyle(1, 0x409EFF);
    g.moveTo(-20, 0).lineTo(20, 0).moveTo(0, -20).lineTo(0, 20);
    return g;
  }

  static getFloorGizmo() {
    const g = new BaseGizmo();
    g.lineStyle(1, Gizmos.COLOR)
      .beginFill(Gizmos.COLOR, 0.1)
      .drawRect(0, 0, 10000, 10000)
      .endFill();

    g.blendMode = PIXI.BLEND_MODES.ADD;
    return g;
  }

  static getCircleGizmo() {
    return new CircleGizmo();
  }

  static getRingGizmo() {
    return new RingGizmo();
  }

  static getBoxGizmo() {
    return new BoxGizmo();
  }

  static getClickGizmo() {
    return new ClickGizmo();
  }
}


// export class CreatorGizmo extends BaseGizmo {
//   constructor() {
//     super();
//     this.lineStyle(1, 0x00ff00);
//     this.drawCircle(0,0,20);
//   }
// }

export class ClickGizmo extends PIXI.Graphics {
  constructor() {
    super();
    this.beginFill(Gizmos.COLOR, 0.3)
      .drawCircle(0, 0, 15)
      .endFill();
    this.visible = false;
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 100);
  }
}


export class CircleGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const angle = params.angle;
    const radius = params.radius;
    const color = Gizmos.COLOR;

    this.clear();

    if (angle === 0 || angle === 2 * Math.PI) {
      this.beginFill(color, 0.2)
        .drawCircle(0, 0, radius)
        .endFill();
    } else {
      const px = Math.cos(-angle * 0.5) * radius;
      const py = Math.sin(-angle * 0.5) * radius;

      this.beginFill(color, 0.2)
        .moveTo(0, 0)
        .lineTo(px, py)
        .arc(0, 0, radius, -angle * 0.5, angle * 0.5)
        .lineTo(0, 0)
        .endFill();
    }

    this.lineStyle(1, color, 0.7).moveTo(0, 0).lineTo(radius + 15, 0);

  }
}

export class RingGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const angle = params.angle;
    const radius = params.radius;
    const color = Gizmos.COLOR;

    this.clear().lineStyle(10, color, 0.3);

    if (angle === 0 || angle === 2 * Math.PI) {
      this.drawCircle(0, 0, radius)
    } else {
      this.arc(0, 0, radius, -angle * 0.5, angle * 0.5);
    }
    this.lineStyle(1, color, 0.7).moveTo(0, 0).lineTo(radius + 15, 0);
  }
}

export class BoxGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const width = params.width;
    const height = params.height;
    const color = Gizmos.COLOR;

    this.clear()
      .beginFill(color, 0.3)
      .drawRect(-width * 0.5, -height * 0.5, width, height)
      .endFill()
      .lineStyle(1, color, 0.7).moveTo(0, 0).lineTo(width * 0.5 + 15, 0);
  }
}

export class BaseGizmo extends PIXI.Graphics {
  constructor() {
    super();
    this.color = 0x0000ff;
  }

  redraw() {

  }

}
