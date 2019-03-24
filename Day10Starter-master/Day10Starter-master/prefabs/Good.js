class Good extends GameObject {
  constructor(){
    super("Good Point");
    
    var myGeometry = new AxisAlignedRectangle(1,1);
    var myGeometryComponent = new GeometryComponent(myGeometry);
    this.components.push(myGeometryComponent);

    var myRenderer = new GeometryRendererComponent("blue", myGeometry);
    this.components.push(myRenderer);
    this.renderer = myRenderer;

    var myBehavior = new GoodSquareBehavior();
    myBehavior.transform = this.transform;
    this.components.push(myBehavior);
     
  }
  
  
}