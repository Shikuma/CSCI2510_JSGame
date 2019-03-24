class Bad extends GameObject {
  constructor(){
    super("Bad Triangle");    

    var myGeometry = new Triangle(0,0, 3,3, 0,4);
    var myGeometryComponent = new GeometryComponent(myGeometry);
    this.components.push(myGeometryComponent);

    var myRenderer = new GeometryRendererComponent("red", myGeometry);
    this.components.push(myRenderer);
    this.renderer = myRenderer;
  }
 
  
}