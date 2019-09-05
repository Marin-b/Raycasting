const HEIGHT =  window.innerHeight;
const WIDTH =  window.innerWidth;
const canvas = document.querySelector("#canvas");

canvas.height = HEIGHT

canvas.width = WIDTH

const BOUND = []
for(i = 0; i < 5; i++){
  const b = new Boundary(randomNumber(WIDTH), randomNumber(HEIGHT), randomNumber(WIDTH) ,randomNumber(HEIGHT))
  BOUND.push(b);
}

class Sketch{
  constructor(){
    this.boundaries = BOUND
    this.ctx = canvas.getContext("2d");
    this.rays = []
  }

  setup() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.boundaries.forEach((b) => {
      b.show(this.ctx);
    })
  }

   draw(e) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      //this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.boundaries.forEach((b) => {
        b.show(this.ctx);
      })
      const posx = e.clientX;
      const posy = e.clientY
      for(let i = 0; i < 360; i+=0.5){
        const radian = (i * (Math.PI /180))
        const r = new Ray(posx, posy, Math.sin(radian), Math.cos(radian))
        this.boundaries.forEach((bound => {
          r.cast(bound);
        }))
        r.show(this.ctx);
      }
  }
}

const sketch = new Sketch
sketch.setup()
canvas.addEventListener("mousemove", (event) => {
  sketch.draw(event)
})

