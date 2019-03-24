var Time = {}                                     //Stores information about time that is available to our game
    var msBetweenFrames = 1000 / 30;                //Time in milliseconds between frames
    Time.deltaTime = msBetweenFrames / 1000;        //Time in seconds between frames.

    //Setup the canvas variables
    var canvas = document.getElementById("canv");
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var width = canvas.width;
    var height = canvas.height;


    var ctx = canvas.getContext("2d");