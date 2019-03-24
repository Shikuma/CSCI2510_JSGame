class Bullet extends GameObject {
    constructor(){
      super("bullet");
      
      var myGeometry = new AxisAlignedRectangle(.5,.5);
      var myGeometryComponent = new GeometryComponent(myGeometry);
      this.components.push(myGeometryComponent);
  
      var myRenderer = new GeometryRendererComponent("black", myGeometry);
      this.components.push(myRenderer);
      this.renderer = myRenderer;
  
      var myBehavior = new BulletBehavior();
      myBehavior.transform = this.transform;
      this.components.push(myBehavior);
       
    }
    
    
  }