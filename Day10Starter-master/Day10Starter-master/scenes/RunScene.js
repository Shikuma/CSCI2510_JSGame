class RunScene extends Scene {
  constructor() {
    super("Run Scene");
  }
  start() {
    super.start();

    this.square = new Good();
    this.camera = new Camera(40, "azure");
    this.camera.transform.position = new Vector2(1 / 2, 1 / 2);


    var rDimensions = positionGUI(width, height, .25, 20, .25)
    this.guiComponent = new GUIRectangleComponent(new AxisAlignedRectangle(rDimensions.width, rDimensions.height), "gray");
    this.guiContainer = new GUIContainer();
    this.guiContainer.components.push(this.guiComponent);
    this.guiContainer.rendererGUI = this.guiComponent;
    this.guiContainer.transform.position.x = rDimensions.x;
    this.guiContainer.transform.position.y = rDimensions.y;

    this.guiTextObject = new GUITextObject("Run Scene");
    this.guiTextObject.transform.position = new Vector2(width / 2, rDimensions.y + rDimensions.height / 2);

    this.hierarchy.push(this.square);
    //this.hierarchy.push(this.otherSquare);
    this.hierarchy.push(this.camera);
    this.hierarchy.push(this.guiContainer);
    this.hierarchy.push(this.guiTextObject);

    this.shooting = false;
    this.mousePos = new Vector2(0,0);
    this.updateTick = 0;
    this.bullets = [];
    for(var i = 0; i < 50; i++){
      this.bullets.push(new Bullet());
      this.bullets[i].active = false;
      this.hierarchy.push(this.bullets[i]);
    }
    this.currBullet = 0;
    
  }

  eventPump(event) {
    super.eventPump(event);
    switch (event.name) {
      //mouse up
      case "click":
        //this.nextScene();
        this.shooting = false;
        break;
      case "resize":
        var rDimensions = positionGUI(width, height, .25, 20, .25)
        this.guiComponent = new GUIRectangleComponent(new AxisAlignedRectangle(rDimensions.width, rDimensions.height), "gray");
        this.guiContainer.components = [];
        this.guiContainer.components.push(this.guiComponent);
        this.guiContainer.rendererGUI = this.guiComponent;
        this.guiContainer.transform.position.x = rDimensions.x;
        this.guiContainer.transform.position.y = rDimensions.y;

        this.guiTextObject.transform.position = new Vector2(width / 2, rDimensions.y + rDimensions.height / 2);
        break;
      case "mousedown":
        this.updateTick = 0;
        this.shooting = true;
        break;
      case "mousemove":
        this.mousePos = new Vector2(((event.location.x/width) * (width / this.camera.zoom)) - (width / this.camera.zoom)/2, -(((event.location.y/height) * (height / this.camera.zoom)) - (height / this.camera.zoom)/2));
        break;
    }
  }
  
  nextScene() {
    state = END_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  }
  
  update() {
    if(this.shooting){
      if(this.updateTick % 3 == 0 || this.updateTick == 0) this.Shoot();
      this.updateTick++;
    }

    var cameraBounds = new Vector2((width / this.camera.zoom)/2, (height / this.camera.zoom)/2);
    //Check if any bullets are outside the screen
    this.bullets.forEach(function(bullet){
      if(bullet.active){
        if(bullet.transform.position.x > cameraBounds.x ||
        bullet.transform.position.x < -(width / cameraBounds.x)/2 ||
        bullet.transform.position.y > (height / cameraBounds.y)/2 ||
        bullet.transform.position.y < -(height / cameraBounds.y)/2){
          bullet.active = false;
          var bulletBehavior = bullet.getComponent(BulletBehavior);
          bulletBehavior.SetActive(false);
          console.log("Disabling bullet");
        }
      }
    });
    
  }

  Shoot(){
    //console.log(this.currBullet);
    this.bullet = this.bullets[this.currBullet];
    this.bullet.active = true;

    var bulletBehavior = this.bullet.getComponent(BulletBehavior);
    
    bulletBehavior.currPosX = this.square.transform.position.x;
    bulletBehavior.currPosY = this.square.transform.position.y;
    bulletBehavior.targetX = this.mousePos.x;
    bulletBehavior.targetY = this.mousePos.y;
    bulletBehavior.SetActive(true);

    this.bullet.transform.position = new Vector2(this.square.transform.position.x, this.square.transform.position.y);
    this.currBullet = this.currBullet < 49 ? this.currBullet+1 : 0;

  }

}