class CameraComponent extends Component{
  constructor(zoom, color){
    super();

    this.backgroundColor = color;
    this.zoom = zoom;

  }
  get exposed (){return ["backgroundColor", "zoom"]}
}