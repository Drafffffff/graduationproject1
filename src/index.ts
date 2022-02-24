// import { Scene } from './scene';
import p5 from "p5";
// window.p5 = p5;
// import Graph from "./graph";
// import poster from "./poster.png";
class rr {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  p: p5;
  a: number;
  constructor(x: number, y: number, p: p5) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 3;
    this.r = 0;
    this.p = p;
    this.a = 0;
  }
  update(px: number, py: number, mode: number) {
    if (mode == 0) {
      this.a = 0;
    }
    if (mode == 1) {
      this.a = this.p.atan2(py - this.y, px - this.x);
    }
    if (mode == 2) {
      this.a = this.p.atan2(py - this.y, px - this.x) + this.p.PI / 2;
    }
  }
  draw() {
    this.p.push();
    this.p.fill("#000");
    this.p.rectMode(this.p.CENTER);
    this.p.translate(this.x, this.y);
    this.p.rotate(this.a);
    this.p.rect(0, 0, this.w, this.h);
    this.p.pop();
  }
}
class people {
  public x: number;
  public y: number;
  xTarget: number;
  yTarget: number;
  p: p5;
  constructor(p: p5) {
    this.x = 0;
    this.y = 0;
    this.xTarget = 0;
    this.yTarget = 0;
    this.p = p;
  }
  update() {
    this.xTarget = this.p.mouseX;
    this.yTarget = this.p.mouseY;
  }
  draw() {
    this.p.push();
    this.p.fill("#aa3322");
    this.x = this.x + (this.xTarget - this.x) * 0.06;
    this.y = this.y + (this.yTarget - this.y) * 0.06;
    this.p.ellipse(this.x, this.y, 20, 20);
    this.p.pop();
  }
}
let mode: number = 0;
const sketch = (p: p5): void => {
  // let pos: p5.Vector;
  // p.preload = (): void => {};
  const rList: rr[] = [];
  const peo = new people(p);
  p.setup = (): void => {
    // p.angleMode(p.DEGREES);
    const canvas = p.createCanvas(400, 400);
    canvas.parent("main");
    p.background("#eee");
    p.noStroke();
    for (let i = 0; i < 9; i++) {
      rList.push(new rr(40 + i * 40, 40, p));
    }
    const button0 = p.createButton("模式1");
    button0.mouseClicked(changeMode0);
    const button1 = p.createButton("模式2");
    button1.mouseClicked(changeMode1);
    const button2 = p.createButton("模式3");
    button2.mouseClicked(changeMode2);
  };
  p.draw = (): void => {
    p.background("#eee");
    peo.update();
    peo.draw();
    rList.forEach((r: rr): void => {
      r.update(peo.x, peo.y, mode);
      r.draw();
    });
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  };

  const changeMode0 = (): void => {
    mode = 0;
  };
  const changeMode1 = (): void => {
    mode = 1;
  };
  const changeMode2 = (): void => {
    mode = 2;
  };
};

new p5(sketch);
