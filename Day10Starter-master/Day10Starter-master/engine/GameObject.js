//A generic GameObject class
class GameObject{
  constructor(name){
    this.transform = new Transform();
    this.components = [];
    this.name = name;
    this.active = true;
  }
  render(ctx) {
    if(this.renderer && this.active){
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