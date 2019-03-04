var endStateHandler = {
  start() {
      updateListeners.push(this);
      
  },
  eventPump(event) {
      switch (event.name) {
      case "timer":
          this.update();
          break;
      case "restart":
          state = RUN_STATE;
          updateListeners.splice(updateListeners.indexOf(this), 1);
          updateStateHandler();
          break;
      case "quit":
          state = TITLE_STATE;
          updateListeners.splice(updateListeners.indexOf(this), 1);
          updateStateHandler();
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
      let ctx = this.ctx;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.width, this.height);

      if(win == false){
          ctx.fillStyle = "red";
          ctx.fillRect(this.width/2 - this.width/4, this.height/2 - this.height/4, this.width/2, this.height/2);
      }else{
          ctx.fillStyle = "green";
          ctx.fillRect(this.width/2 - this.width/4, this.height/2 - this.height/4, this.width/2, this.height/2);
      }
  }
};