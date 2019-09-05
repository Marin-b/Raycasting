class Ray{
  constructor(x, y, dirx, diry){
    this.pos = {x: x, y: y};
    this.dir = {x: dirx, y: diry};
    this.length = 10000;
  }

  show(ctx){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + (this.dir.x * this.length), this.pos.y + (this.dir.y * this.length))
    ctx.stroke();
    ctx.closePath();
  }

  cast(bound){
    const x1 = this.pos.x;
    const x2 = this.pos.x + (this.dir.x * window.innerWidth);
    const y1 = this.pos.y;
    const y2 = this.pos.y + (this.dir.y * window.innerWidth);
    const x3 = bound.a.x;
    const x4 = bound.b.x;
    const y3 = bound.a.y;
    const y4 = bound.b.y;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0 && u < 1) {
      const diffX = x1 - (x1 + t * (x2 - x1));
      const diffY = y1 - (y1 + t * (y2 - y1));
      const newLength  = Math.sqrt(diffX * diffX + diffY * diffY) - 2
      this.length = newLength < this.length ? newLength : this.length;
    }
  }
}
