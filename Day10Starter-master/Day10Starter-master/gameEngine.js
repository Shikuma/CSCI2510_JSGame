
//./geo/A.js
/*console.log("In circle");
class Circle extends Geometry {
  constructor(a) {
    super();
    this.radius = 1;

    // Handle constructor arguments
    // There are three cases we check for
    // No arguments -> use default values
    // One argument + argument is a number -> treat argument as the new radius
    // One argument + argument is another circle -> treat constructor as a copy constructor

    if (a === undefined) {
      //use default values
      return;
    }
    //If we get here, we have an argument
    if (a instanceof Circle) {
      this.radius = a.radius;
      return;
    }
    if (typeof a == "number") {
      this.radius = a;
      return;
    }
    // If we get here, we had one parameter, but was of the wrong type
    throw "Bad parameter type in circle constructor";
  }
}

console.log("Circle file");*/
//./geo/AxisAlignedRectangle.js
class AxisAlignedRectangle extends Geometry {
  constructor(a, b) {
    super();
    this.widthHeight;

    // JS doesn't allow multiple constructors, so we'll examine the constructor arguments to see what we should do.
    // Cases:
    // No parameters -> create a default rectangle
    // One parameter -> Expect either another AxisAlignedRectangle (copy constructor) or Vector2 (widthHeight) 
    // Two parameters -> Expect two floats as width, height

    if (a === undefined) {
      //No parameters
      this.widthHeight = new Vector2(1, 1);
      return;
    }
    if (b === undefined) {
      //If we get here, we have exactly one parameter
      if (a instanceof AxisAlignedRectangle) {
        this.widthHeight = a.widthHeight;
        return;
      }
      if (b instanceof Vector2) {
        this.widthHeight = new Vector2(a);
        return;
      }
      //If we get here, we have one argument but of the wrong type
      throw "Bad parameter type in AxisAlignedRectangle constructor";
    }
    //If we get here we have two arguments
    if (!typeof a === "number" || !typeof b === "number")
      throw "Bad parameter type in AxisAlignedRectangle constructor";
    //If we get here we have two numbers as arguments
    this.widthHeight = new Vector2(a, b);

  }

}
//./geo/Circle2.js
/*console.log("In circle");
class Circle2 extends Geometry {
  constructor(a) {
    super();
    this.radius = 1;

    // Handle constructor arguments
    // There are three cases we check for
    // No arguments -> use default values
    // One argument + argument is a number -> treat argument as the new radius
    // One argument + argument is another circle -> treat constructor as a copy constructor

    if (a === undefined) {
      //use default values
      return;
    }
    //If we get here, we have an argument
    if (a instanceof Circle) {
      this.radius = a.radius;
      return;
    }
    if (typeof a == "number") {
      this.radius = a;
      return;
    }
    // If we get here, we had one parameter, but was of the wrong type
    throw "Bad parameter type in circle constructor";
  }
}

console.log("Circle file");*/
//./geo/CircleFile.js
console.log("In circle");
class Circle extends Geometry {
  constructor(a) {
    super();
    this.radius = 1;

    // Handle constructor arguments
    // There are three cases we check for
    // No arguments -> use default values
    // One argument + argument is a number -> treat argument as the new radius
    // One argument + argument is another circle -> treat constructor as a copy constructor

    if (a === undefined) {
      //use default values
      return;
    }
    //If we get here, we have an argument
    if (a instanceof Circle) {
      this.radius = a.radius;
      return;
    }
    if (typeof a == "number") {
      this.radius = a;
      return;
    }
    // If we get here, we had one parameter, but was of the wrong type
    throw "Bad parameter type in circle constructor";
  }
}

console.log("Circle file");
//./geo/Geometry.js
class Geometry{
  constructor(){
    
    
  }

}
//./geo/Line.js
class Line extends Geometry{
  constructor(a,b){
    super();

    this.a = 0;
    this.b = 0;
    this.c = 0;

    this.a = a.y-b.y;
    this.b = b.x-a.x;
    this.c = a.x*b.y-b.x*a.y;

  }
}
//./geo/Triangle.js
class Triangle extends Geometry{
  constructor(a,b,c,d,e,f){
    super();

    this.points = [];

    let badConstructorCount = "Triangle constructor needs one argument (copy constructor), three argumments (Vector2s), or three arguments (floats)"

    if(a === undefined)
      throw badConstructorCount
    
    if(b === undefined){
      for(let i = 0; i < 3; i++){
        this.points.push(a.points[i]);
      }
    }

    else if(c === undefined)
      throw badConstructorCount;
    if(!d)
    {
      this.points.push(a);
      this.points.push(b);
      this.points.push(c);
    }
    else if(e === undefined)
      throw badConstructorCount;
    else{
      this.points.push(new Vector2(a,b));
      this.points.push(new Vector2(c,d));
      this.points.push(new Vector2(e,f));
    }    
  }
}
//./geo/Vector2.js
//A class that holds an x and y component
class Vector2 extends Geometry {
  constructor(a, b) {
    super();
    this.x = 0;
    this.y = 0;

    //Check that we have the right number of arguments of the right type
    // Zero parameters -> default value
    // One parameter -> Expect another Vector2
    // Two parameters -> Expect two numbers in x,y format
    if (a == undefined) {
      //No parameters, so we are fine with the default values above.
      return;
    }
    if (b === undefined) {
      //Exactly one parameter
      if (!a instanceof Vector2) {
        throw "Wrong parameter types in Vector2 constructor";
      }
      //If we get here, we have one parameter that is another Vector2
      //Treat this as a copy constructor
      this.x = a.x;
      this.y = a.y;
    }
    //If we get here, we have two parameters
    if (!typeof a === "number" || !typeof b == "number") {
      throw "wrong parameter types in Vector2 constructor";
    }
    //If we get here, we have two arguments that are both numbers
    this.x = a;
    this.y = b;

  }
}
//./physics/Collider.js

//./components/AxisAlignedRectangleComponent.js
class AxisAlignedRectangleComponent extends GeometryComponent {
  constructor(axisAlignedRectangle) {
    super();
    
    //If we received a parameter, use that rectangle
    if (axisAlignedRectangle)
      this.Geometry = axisAlignedRectangle;
    //Otherwise, create a new rectangle
    else
      this.Geometry = new AxisAlignedRectangle();
  }
}
//./components/CircleComponent.js
class CircleComponent extends Geometry{
  constructor(circle){
    super();
    
    //If we received a parameter, use that circle
    if (circle)
      this.Geometry = circle;
    //Otherwise, create a new circle
    else
      this.Geometry = new Circle();
  }
}
//./components/Component.js
class Component{
 get name(){
   return this.constructor.name;
 }
}
//./components/GeometryComponent.js
class GeometryComponent extends Component{
  constructor(geometry){
    super();
    this.Geometry = geometry;

  }
}
//./components/GeometryRendererComponent.js
class GeometryRendererComponent extends RendererComponent {
  constructor(color, geometry) {
    super()
    this.color;
    this.geometry;

    // Check the arguments. We expect exactly two. 
    // The first is a color
    // The second is a geometry

    this.color = color;
    this.geometry = geometry;
  }

  render(ctx, gameObject) {

    ctx.fillStyle = this.color;

    if (this.geometry instanceof AxisAlignedRectangle) {
      let width = this.geometry.widthHeight.x;
      let height = this.geometry.widthHeight.y;

      let x = -width / 2;
      let y = -height / 2;

      ctx.fillRect(x, y, width, height);

    }
    else if (this.geometry instanceof Circle) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, this.geometry.radius, this.geometry.radius, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    else if (this.geometry instanceof Vector2) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .05;

      ctx.beginPath();
      ctx.moveTo(this.geometry.x - .25, 0);
      ctx.lineTo(this.geometry.y + .25, 0);
      ctx.moveTo(0, this.geometry.y + .25);
      ctx.lineTo(0, this.geometry.y - .25);
      ctx.stroke();     
    }
    else if(this.geometry instanceof Triangle){
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .1;
      ctx.beginPath();
      ctx.moveTo(this.geometry.points[0].x, this.geometry.points[0].y);
      ctx.lineTo(this.geometry.points[1].x, this.geometry.points[1].y);
      ctx.lineTo(this.geometry.points[2].x, this.geometry.points[2].y);
      ctx.lineTo(this.geometry.points[0].x, this.geometry.points[0].y);
      ctx.stroke();

    }



  }
}
//./components/GUIRectangleComponent.js
class GUIRectangleComponent extends GUIRendererComponent{
  constructor(axisAlignedRectangle, color){
    super()
    if(!axisAlignedRectangle || !color)
      throw "GUIRectangleComponent expects a constructor with two arguments";
    this.axisAlignedRectangle = axisAlignedRectangle;
    this.color = color;
    
  }
  renderGUI(ctx, gameObject){

    let x;
    let y;
    let width;
    let height;

    x = gameObject.transform.position.x;
    y = gameObject.transform.position.y;
    width = this.axisAlignedRectangle.widthHeight.x;
    height = this.axisAlignedRectangle.widthHeight.y;

    ctx.fillStyle = this.color;
    ctx.fillRect(x,y,width,height);
  }
}
//./components/GUIRendererComponent.js
class GUIRendererComponent extends Component{
  constructor(){
    super();
  }
  renderGUI(ctx, gameObject){
    throw "All implementations of GUIRendererComponent must override render."
  }
}
//./components/GUITextComponent.js
class GUITextComponent extends GUIRendererComponent{
  constructor(text, color, font){
    super();
    this.text = text;
    this.color = color;
    this.font  = font;

    if(!text || !color || !font)
      throw "GUITextComponent expects exactly three arguments in its constructor";

  }
  renderGUI(ctx, gameObject){

    ctx.fillStyle = this.color;
    ctx.font = this.font;

    ctx.fillText(this.text, gameObject.transform.position.x -  ctx.measureText(this.text).width / 2, gameObject.transform.position.y);

  }
}
//./components/PointComponent.js
class PointComponent extends GeometryComponent{
  constructor(point){
    super();
    
    //If we received a parameter, use that point
    if (point)
      this.Geometry = point;
    //Otherwise, create a new Vector2
    else
      this.Geometry = new Vector2();
  }
}
//./components/RendererComponent.js
class RendererComponent extends Component{
  constructor(){
    super();
  }
  render(ctx, gameObject){
    throw "All implementations of RenderComponent must override render."
  }

}
//./components/TriangleComponent.js
class TriangleComponent extends GeometryComponent{
  constructor(Triangle){
    super()
    this.Triangle = Triangle;
  }
}
//./engine/Camera.js
class Camera extends GameObject{
  constructor(zoom, color){
    super("Camera");
    
    this.cameraComponent = new CameraComponent(zoom, color);
    this.components.push(this.cameraComponent);
  }
  get zoom(){
    return this.getComponent(CameraComponent).zoom;
  }
  get backgroundColor(){
    return this.getComponent(CameraComponent).backgroundColor;
  }
}
//./engine/CameraComponent.js
class CameraComponent extends Component{
  constructor(zoom, color){
    super();

    this.backgroundColor = color;
    this.zoom = zoom;

  }
  get exposed (){return ["backgroundColor", "zoom"]}
}
//./engine/GameObject.js
//A generic GameObject class
class GameObject{
  constructor(name){
    this.transform = new Transform();
    this.components = [];
    this.name = name;
  }
  render(ctx) {
    if(this.renderer){
      this.renderer.render(ctx, this);
    }
  }
  renderGUI(ctx){
    if(this.rendererGUI){
      this.rendererGUI.renderGUI(ctx,this);
    }
  }
  getComponent(type){
    for(let i = 0; i < this.components.length; i++){
      let component = this.components[i];
      if(component instanceof type){
        return component;
      }
    }
    return undefined;
  }
}
//./engine/Scene.js
class Scene {
  constructor(name) {
    this.hierarchy = [];
    this.name = name;

  }
  start() {
    this.hierarchy = [];

    updateListeners.push(this);

  }

  eventPump(event) {
    switch (event.name) {
      case "resize":
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        //canvas.height = rect.height;
        width = canvas.width;
        height = canvas.height;
        break;
      case "timer":
        this.update();

        for (let i = 0; i < this.hierarchy.length; i++) {
          var gameObject = this.hierarchy[i];
          let components = gameObject.components;
          for (let j = 0; j < components.length; j++) {
            let component = components[j];
            if (component instanceof Behavior) {
              if (typeof component.update === "function")
                component.update(gameObject);
            }
          }

        }
        this.render();
        break;

    }
  }
  render() {


    //This is where I render. I don't update my model here.
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    //canvas.height = rect.height;
    width = canvas.width;
    height = canvas.height;



    ctx.fillStyle = this.camera.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    {
      //Camera transformations
      ctx.translate(this.camera.transform.position.x * canvas.width, this.camera.transform.position.y * canvas.height);
      ctx.scale(this.camera.zoom, this.camera.zoom);

      ctx.save(); {
        ctx.scale(1, -1);
        ctx.save(); {
          for (var i = 0; i < this.hierarchy.length; i++) {
            var gameObject = this.hierarchy[i];
            ctx.save(); {
              ctx.translate(gameObject.transform.position.x, gameObject.transform.position.y);
              ctx.scale(gameObject.transform.scale.x, gameObject.transform.scale.y);
              if (typeof gameObject.render === "function")
                gameObject.render(ctx);
            }
            ctx.restore();
          }
        }
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();


    //Now do screen space rendering
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      ctx.save(); {
        if (typeof gameObject.renderGUI === "function")
          gameObject.renderGUI(ctx);
      }
      ctx.restore();
    }
  }
}
//./engine/Transform.js
//Defines a model's transforms from model space into world space
class Transform{

  constructor(){
    //translate
   this.position = new Vector2();

    //scale
    this.scale = new Vector2();
    this.scale.x = 1;
    this.scale.y = 1;

    //rotate
    this.rotation = 0;
  }
}