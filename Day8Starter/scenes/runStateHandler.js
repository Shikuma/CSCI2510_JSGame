class Bullet{
  width = 5;
  height = 15;
  speed = 0;
  posX = 0;
  posY = 0;
  enabled = false;
}

class Enemy{
  posX = 0;
  posY = 0;
  size = 15;
  enabled = true;
}

var forward = true;
var win = false;
var playerOffset = 0;
var playerSpeed = 100;

//arbitrary value, not actually use outside calculating the clamp values
//Think of it as padding
var playerSize = 10.0;
var playerClampMin = playerSize;
var playerClampMax;
var playerCurrPos;
var lives = 3;
var score = 0;

var hudText = "";

var bulletsCapacity = 10;
var bullets = [];
var currBullet = 0;

var numEnemies = 50;
var enemySpeed = 10;
var enemyOffsetX = 0;
var enemyOffsetY = 0;
var enemyPositionx;
var enemies = [];

var runStateHandler = {
  start() {
      updateListeners.push(this);
      this.rotation = 0;
      enemyOffsetX = 0;
      enemyOffsetY = 0;
      enemyPositionx = (enemyOffsetX * enemySpeed);
      forward = true;
      playerClampMax = this.width - playerSize;
      playerCurrPos = (playerOffset*playerSpeed) + this.width/2;
      currBullet = 0;
      hudText = document.getElementById("hudText");

      for(i = 0; i < bulletsCapacity; i++){
          bullets.push(new Bullet());
          bullets[i].posX = this.width/2;
          bullets[i].posY = -20;
      }
      for(i = 0; i < numEnemies; i++){
          enemies.push(new Enemy());
      }

      console.log(lives);
  },
  eventPump(event) {
      switch (event.name) {
      case "next":
          state = END_STATE;
          updateListeners.splice(updateListeners.indexOf(this), 1);
          updateStateHandler();
          break;

      case "timer":
          this.update();
          break;

      case "moveLeft":
          if(playerCurrPos > playerClampMin)
              playerOffset -= .1;
          break;
      case "moveRight":
          playerClampMax = this.width - playerSize; 
          console.log(playerClampMax);
          console.log(this.width + " " + playerSize);
          if(playerCurrPos < playerClampMax)
              playerOffset += .1;
          break;
      case "shoot":
          console.log("Pew pew!");
          bullets[currBullet].enabled = true;
          //Set the bullet position to the player's position
          bullets[currBullet].posX = playerCurrPos;
          bullets[currBullet].posY = this.height/2 + this.height/2.2;
          //set the speed
          bullets[currBullet].speed = 10;
          //increment to the next bullet, clamping between 0 and bulletsCapacity
          currBullet = currBullet >= bulletsCapacity-1 ? 0 : currBullet+1;
          console.log(currBullet);
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

      if(forward == true) enemyOffsetX += .1;
      else enemyOffsetX -= .1;

      //console.log((enemyOffsetX * enemySpeed));

      if((enemyOffsetX * enemySpeed) >= this.width/2 && forward == true){
           forward = false;
           enemySpeed*=1.1;
           enemyOffsetY++;
      }else if((enemyOffsetX * enemySpeed) <= -this.width/2 && forward == false){
           forward = true;
           enemySpeed*=1.1;
           enemyOffsetY++;
      }
      
      //Enemies parent
      ctx.save()
      {
          enemyPositionx = (enemyOffsetX * enemySpeed);
          if(enemyPositionx >= this.width/2) enemyPositionx = this.width/2;
          else if(enemyPositionx <= -this.width/2) enemyPositionx = -this.width/2;

          ctx.translate(enemyPositionx, (this.height/20) + (this.height/20) * enemyOffsetY);
          ctx.scale(1, 1);
          
          //Draw ships
          var currShip = 0;
          for(var i = 0; i < 5; i++){
              //Draw the row
              ctx.save()
              {
                  var enemyPosY = i*(enemies[currShip].size) * 2 * 1.5;
                  ctx.translate(0, enemyPosY);
                  ctx.scale(1, 1);
                  ctx.fillStyle = "blue";
                  //left and right padding of 50 pixels
                  ctx.fillRect(25, -enemies[currShip].size, this.width-50, enemies[currShip].size*2)
                  
                  //Draw the column
                  for(var j = 0; j < numEnemies/5; j++){
                      ctx.save()
                      {
                          var enemyPosX = 50 + (enemies[currShip].size * 4 * j);
                          ctx.translate(enemyPosX, 0);
                          ctx.scale(1, 1);
                          ctx.fillStyle = "white";
                          if(enemies[currShip].enabled == true)
                              ctx.fillRect(-(enemies[currShip].size/2),-(enemies[currShip].size/2),enemies[currShip].size,enemies[currShip].size);
                      }
                      ctx.restore();
                      enemies[currShip].posX = enemyPosX;
                      enemies[currShip].posY = enemyPosY;
                      currShip++;
                  }
                  
              }
              ctx.restore();
          }
      }ctx.restore();


      //Player parent
      ctx.save()
      {
          //Draw the player
          //moves 10 pixels per frame with 100 speed and .01 offset
          playerCurrPos = this.width/2 + (playerOffset*playerSpeed);
          //playerPosx = playerPosx <= playerClampMin ? playerClampMin : playerPosx >= playerClampMax ? playerClampMax : playerPosx;
          ctx.translate(playerCurrPos, this.height/2 + this.height/2.2);
         
          ctx.scale(10,10);
          ctx.fillStyle = "red";
          ctx.fillRect(-1,-1,2, 2);

          
      } ctx.restore();

      //Bullets are broken
      //I think it is not resetting the context fast enough
      //First 2 bullets fired work fine
      //The rest of the bullets require the previous one to be off screen
      
      //Spawn in any active bullets
      
      var i = 0;
      //Loop through all bullets
      bullets.forEach(function(bullet){
          //Is the bullet on the screen?
          if(bullet.enabled == true){
              ctx.save()
              {
                  //move 10 pixels up per frame
                  bullet.posY -= bullet.speed;

                  if(bullet.posY <= -20){
                      console.log("Disabling bullet");
                      bullet.enabled = false;
                  } 
                  //console.log(bullet.posY);

                  ctx.translate(bullet.posX, bullet.posY);
                  ctx.scale(1,1);
                  ctx.fillStyle = "green";
                  ctx.fillRect(-(bullet.width/2), -(bullet.height/2), bullet.width, bullet.height);
              }
              ctx.restore();
              
              //Check if any active bullets have hit an enemy
              enemies.forEach(function(enemy){
                  if(enemy.enabled == true){
                      var xDist = Math.abs(bullet.posX - enemy.posX);
                      var yDist = Math.abs(bullet.posY - enemy.posY);
                      var maxDistX = (bullet.width/2 + enemy.size/2);
                      var maxDistY = (bullet.height/2 + enemy.size/2);
                      //console.log(xDist + " " + yDist + " " + maxDistX + " " + maxDistY);
                      if(xDist <= maxDistX && yDist <= maxDistY){
                          enemy.enabled = false;
                          score++;
                      } 
                  }
              });
          i++;
          }
      });
      
      //Check if the player has lost yet
      //Refine it later to check individual enemy collision, rather than row collision
      if(enemyOffsetY >= 11) {
          win = false;
          lives--;
          if(lives == 0)
              state = END_STATE;
          else
              state = RUN_STATE;
          updateListeners.splice(updateListeners.indexOf(this), 1);
          updateStateHandler();
      }
  }
};