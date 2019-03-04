var loadStateHandler = {
  start() {
      updateListeners.push(this);
  },
  eventPump(event) {
      switch (event.name) {
          case "next":
              state = RUN_STATE;
              updateListeners.splice(updateListeners.indexOf(this), 1);
              updateStateHandler();
              break;
          case "timer":
              this.update();
              break;
      }
  },
  update() {
      this.canvas = document.getElementById("canv");
      this.ctx = this.canvas.getContext("2d");
      this.width = 640;
      this.height = 480;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.rotation += .01;

      let ctx = this.ctx;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.width, this.height);

  }
};