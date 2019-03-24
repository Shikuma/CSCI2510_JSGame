class BulletBehavior extends Behavior{
    constructor(){
        super();
        this.speed = 10;
        this.currPosX = 0;
        this.currPosY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.active = false;
    }
    update(){
        if(this.active){
            this.Move(this.CalculateDirection(new Vector2(this.currPosX, this.currPosY), new Vector2(this.targetX, this.targetY)));
        }

    }

    Lerp(startPos, targetPos){
        //Get distance
        var direction = new Vector2(targetPos.x - startPos.x, targetPos.y - startPos.y);
        //Get magnitude
        var magnitude = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
        //normalize
        direction = new Vector2(direction.x/magnitude, direction.y/magnitude);
        //curr position +  speed * time * normalized direction
        var newPos = new Vector2(startPos.x + (direction.x * this.speed * Time.deltaTime), startPos.y + (direction.y * this.speed * Time.deltaTime));
        this.currPosX = newPos.x;
        this.currPosY = newPos.y;
        return newPos;
    }

    CalculateDirection(startPos, targetPos){
        var direction = new Vector2(targetPos.x - startPos.x, targetPos.y - startPos.y);
        //Get magnitude
        var magnitude = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
        //normalize
        direction = new Vector2(direction.x/magnitude, direction.y/magnitude);
        return direction;
    }

    Move(direction){
        this.transform.position = new Vector2(this.transform.position.x + (direction.x * this.speed * Time.deltaTime), this.transform.position.y + (direction.y * this.speed * Time.deltaTime));
    }
    
    SetActive(check){
        this.active = check;
    }
  
  }