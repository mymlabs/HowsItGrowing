(function(){
	init();
	initObjects();
	loadAssets();
	
//   /$$           /$$   /$$    
//  |__/          |__/  | $$    
//   /$$ /$$$$$$$  /$$ /$$$$$$  
//  | $$| $$__  $$| $$|_  $$_/  
//  | $$| $$  \ $$| $$  | $$    
//  | $$| $$  | $$| $$  | $$ /$$
//  | $$| $$  | $$| $$  |  $$$$/
//  |__/|__/  |__/|__/   \___/  
// 
	function init(){
		//init game environment
		canvas = document.getElementById("canvas");
		c = canvas.getContext("2d");
		canvas.width = 1280;
		canvas.height = 720;
		screenWidth = canvas.width;
		screenHeight = canvas.height;
		halfWidth = screenWidth / 2;
		halfHeight = screenHeight / 2;
		offsetX = container.offsetLeft;
		offsetY = container.offsetTop;
		INPUT_TYPE = null;
		filesToLoad = 9;
		filesLoaded = 0;
		GAME_STATE = "loading";
		gameLoaded = false;
		gameLoop = setInterval(updateScreen,33);
	    easeValue = .25;
		tweenSpring = .1;tweenFriction = .8;
		targetSpring = .4;targetFriction = .8;

		takeQuizBtnScale = 1;
		nextBtnScale = 1;
		backBtnScale = 1;

		amplitude = 0.02;
		period = 2000;
		titleScreenText = "Discover your place in the garden and learn positive coping strategies by taking this personality quiz.";



		currentQuestion = 1;
		totalQuestions = 15;

		percentageResult = 0;

		activeFadeObjects = [];
		activeTitleObjects = [];
		activeSliderObject = [];
	}//End of init

//   /$$                           /$$ /$$                    
//  | $$                          | $$|__/                    
//  | $$  /$$$$$$   /$$$$$$   /$$$$$$$ /$$ /$$$$$$$   /$$$$$$ 
//  | $$ /$$__  $$ |____  $$ /$$__  $$| $$| $$__  $$ /$$__  $$
//  | $$| $$  \ $$  /$$$$$$$| $$  | $$| $$| $$  \ $$| $$  \ $$
//  | $$| $$  | $$ /$$__  $$| $$  | $$| $$| $$  | $$| $$  | $$
//  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$| $$  | $$|  $$$$$$$
//  |__/ \______/  \_______/ \_______/|__/|__/  |__/ \____  $$
//                                                   /$$  \ $$
//                                                  |  $$$$$$/

	function loadAssets(){
		//----------     INIT IMAGES    ----------
		background = new Image();
		youthExpertsLogo = new Image();
		gameLogo = new Image();
		takeQuizBtn = new Image();
		quizBG = new Image();
		sliderBG = new Image();
		sliderControl = new Image();
		backBtn = new Image();
		nextBtn = new Image();
		//----------     ADD LISTENERS     ----------
		background.onload = updateLoading();
		youthExpertsLogo.onload = updateLoading();
		gameLogo.onload = updateLoading();
		takeQuizBtn.onload = updateLoading();
		quizBG.onload = updateLoading();
		sliderBG.onload = updateLoading();
		sliderControl.onload = updateLoading();
		backBtn.onload = updateLoading();
		nextBtn.onload = updateLoading();
		//----------     SET SOURCES    ----------
		background.src = "images/background.png";
		youthExpertsLogo.src = "images/youthexperts_sm.png";
		gameLogo.src = "images/game_logo.png";
		takeQuizBtn.src = "images/take_quiz_btn.png";
		quizBG.src = "images/quiz_bg.png";
		sliderBG.src = "images/slider_bg.png";
		sliderControl.src = "images/slider_control.png";
		backBtn.src = "images/back_button.png";
		nextBtn.src = "images/next_button.png";
	}//End of loadAssets

	//************************************
	//******     UPDATE LOADING     ******
	//************************************
	function updateLoading(){
		filesLoaded++;
		loadingProgress = filesLoaded / filesToLoad;
		if(!gameLoaded){
			if(filesLoaded >= filesToLoad){
				gameLoaded = true;
				container.addEventListener("touchstart",onTouch);
				container.addEventListener("mousedown",onTouch);
				container.addEventListener("mousemove",onMove);
				activeFadeObjects[0] = new screenFade(1,0,"#FFF");
				GAME_STATE = "title";
			}
		}
	}


//             /$$                                 /$$             
//            | $$                                | $$             
//    /$$$$$$ | $$$$$$$  /$$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$$$$$$
//   /$$__  $$| $$__  $$|__/ /$$__  $$ /$$_____/|_  $$_/  /$$_____/
//  | $$  \ $$| $$  \ $$ /$$| $$$$$$$$| $$        | $$   |  $$$$$$ 
//  | $$  | $$| $$  | $$| $$| $$_____/| $$        | $$ /$$\____  $$
//  |  $$$$$$/| $$$$$$$/| $$|  $$$$$$$|  $$$$$$$  |  $$$$//$$$$$$$/
//   \______/ |_______/ | $$ \_______/ \_______/   \___/ |_______/ 
//                 /$$  | $$                                       
//                |  $$$$$$/                                       
//                 \______/           
	function initObjects(){

		//***********************************
		//******     SLIDER OBJECT      *****
		//***********************************
		sliderObject = function(){
			//----------     INIT     ----------
			var that = this;
			that.x = 946;
			that.y = 290;
			that.width = sliderControl.width;
			that.height = sliderControl.height;
			that.xMin = 739;
			that.xMax = 1141;
			that.sliderLength = that.xMax - that.xMin;
			that.active = false;

			//----------     CHECK COLLISION     ----------
			that.checkCollision = function(xClick,yClick){
				if(xClick > that.x - 15 && xClick < that.x + that.width + 15){
					if(yClick > that.y && yClick < that.y + that.height){
						that.active = true;
					}
				}
			}

			//----------     UPDATE     ----------
			that.update = function(){

				c.drawImage(sliderControl, that.x, that.y)

			}

		}


		//*********************************
		//******     SCREEN FADE     ******
		//*********************************
		screenFade = function(startAlpha,targetAlpha,fadeColor){
			//----------     INIT     ----------
			var that = this;
			that.alpha = startAlpha;
			that.targetAlpha = targetAlpha;
			that.color = fadeColor;
			that.active = true;

			//----------     UPDATE     ----------
			that.update = function(){
				if(that.active == true){
					if(that.alpha > that.targetAlpha){
						that.alpha -= .05;
						if(that.alpha <= that.targetAlpha){
							that.alpha = that.targetAlpha;
							that.active = false;
						}
					}else{
						that.alpha += .05;
						if(that.alpha >= that.targetAlpha){
							that.alpha = that.targetAlpha;
						}
					}
					c.fillStyle = that.color;
					c.save()
						c.globalAlpha = that.alpha;
						c.fillRect(0,0,screenWidth,screenHeight);
					c.restore();
				}
			}
		}//End of Screen Fade

		//**********************************
		//******     TITLE OBJECT     ******
		//**********************************
		titleObject = function(image,xpos,ypos,xtarg,ytarg){
			var that = this;
			that.active = true;
			that.image = image;
			that.x = xpos;
			that.y = ypos;
			that.targX = xtarg;
			that.targY = ytarg;
			that.update = function(){
				if(that.active === true){
					var dx = that.targX - that.x;
					var dy = that.targY - that.y;
					var velx = Math.ceil(dx*easeValue);
					var vely = Math.ceil(dy*easeValue);
					that.x += velx;
					that.y += vely;
					if(dx < 0){dx *= -1};
					if(dy < 0){dy *= -1};
					if(dx <= 3 && dy <= 3){
						that.x = that.targX;
						that.y = that.targY;
						that.active = false;
					}
				}
				c.drawImage(that.image,that.x,that.y);
			}
		}//End of titleObject

	}//End of initObjects

//                             /$$             /$$              
//                            | $$            | $$              
//   /$$   /$$  /$$$$$$   /$$$$$$$  /$$$$$$  /$$$$$$    /$$$$$$ 
//  | $$  | $$ /$$__  $$ /$$__  $$ |____  $$|_  $$_/   /$$__  $$
//  | $$  | $$| $$  \ $$| $$  | $$  /$$$$$$$  | $$    | $$$$$$$$
//  | $$  | $$| $$  | $$| $$  | $$ /$$__  $$  | $$ /$$| $$_____/
//  |  $$$$$$/| $$$$$$$/|  $$$$$$$|  $$$$$$$  |  $$$$/|  $$$$$$$
//   \______/ | $$____/  \_______/ \_______/   \___/   \_______/
//            | $$                                              
//            | $$                                              
//            |__/      
	function updateScreen(){

		//----------     TITLE     ----------
		if(GAME_STATE === "title"){
			c.drawImage(background,0,0);
			c.drawImage(youthExpertsLogo,953,611);

			var currentTime = new Date().getTime();
			var newScale = amplitude * Math.sin(currentTime * 2 * Math.PI / period) + 1;

			drawScaledImage(gameLogo,newScale,335,212)

			drawScaledImage(takeQuizBtn,takeQuizBtnScale,312,513);

			c.save();
				c.fillStyle = "#FFF";
				c.globalAlpha = 0.8;
				c.fillRect(643,110,603,177);
			c.restore();

			c.textAlign = "center";
			c.fillStyle = "#000";
			c.font = "38px arial bold, sans-serif";
			c.fillText("Which type of plant are you?",946,157);
			c.font = "28px arial bold, sans-serif";
			wrapText(c,titleScreenText,946,202,610,32);


			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		}

		if(GAME_STATE === "quiz"){
			c.drawImage(background,0,0);
			c.drawImage(youthExpertsLogo,953,611);
			c.drawImage(gameLogo,25,21);

			activeTitleObjects.forEach(function(titleObject,index){
				titleObject.update();
			});

			c.drawImage(sliderBG,746,311);
			/*c.drawImage(sliderControl,941,290);*/
			activeSliderObject[0].update();

			c.textAlign = "center";
			c.fillStyle = "#000";
			c.font = "25px arial bold, sans-serif";

			c.fillText("Question " + currentQuestion + " of " + totalQuestions + ":",962,50);
			wrapText(c,"Don't know what's out there",745,387,198,26);
			wrapText(c,"Lots of community connections",1167,387,198,26);
			c.fillText("Unsure",959,390);

			c.font = "34px arial bold, sans-serif";
			wrapText(c,"I have wide reaching roots that connect me to my community.",956,180,536,35);


			drawScaledImage(backBtn,backBtnScale,741,653);
			drawScaledImage(nextBtn,nextBtnScale,1187,655);
		}
	}//End of updateScreen


//               /$$                 /$$              
//              | $$                | $$              
//    /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$    /$$$$$$ 
//   /$$_____/|_  $$_/   |____  $$|_  $$_/   /$$__  $$
//  |  $$$$$$   | $$      /$$$$$$$  | $$    | $$$$$$$$
//   \____  $$  | $$ /$$ /$$__  $$  | $$ /$$| $$_____/
//   /$$$$$$$/  |  $$$$/|  $$$$$$$  |  $$$$/|  $$$$$$$
//  |_______/    \___/   \_______/   \___/   \_______/
//  
	function changeState(){
		switch(GAME_STATE){
			case "title":
				activeTitleObjects[activeTitleObjects.length] = new titleObject(quizBG,screenWidth,0,617,0);
				activeSliderObject[0] = new sliderObject();
				GAME_STATE = "quiz";
				break;

			case "quiz":

				break;
		}
	}
//   /$$                                 /$$    
//  |__/                                | $$    
//   /$$ /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$  
//  | $$| $$__  $$ /$$__  $$| $$  | $$|_  $$_/  
//  | $$| $$  \ $$| $$  \ $$| $$  | $$  | $$    
//  | $$| $$  | $$| $$  | $$| $$  | $$  | $$ /$$
//  | $$| $$  | $$| $$$$$$$/|  $$$$$$/  |  $$$$/
//  |__/|__/  |__/| $$____/  \______/    \___/  
//                | $$                          
//                | $$                          
//                |__/   

	//******************************
	//******     ON TOUCH     ******
	//******************************
	function onTouch(e){
		window.scrollTo(0,1);
		e.preventDefault();

 		if(!INPUT_TYPE){
			if(e.clientX){
				INPUT_TYPE = "mouse";
				container.removeEventListener("touchstart",onTouch);
				/*container.addEventListener("mousemove",onMove);*/
				container.addEventListener("mouseup",onRelease);
			}else{
				INPUT_TYPE = "touch";
				container.removeEventListener("mousedown",onTouch);
				container.addEventListener("touchend",onRelease);
			}
		}
		if(INPUT_TYPE == "mouse"){
			clickX = e.clientX - offsetX;clickY = e.clientY - offsetY;
		}else{
			clickX = e.touches[0].pageX - offsetX;clickY = e.touches[0].pageY - offsetY;
		}

		var modelY = clickY * (canvas.height / canvas.offsetHeight);
		var modelX = clickX * (canvas.width / canvas.offsetWidth);

		switch(GAME_STATE){
			case "title":
				if(modelX > 202 && modelX < 422){
					if(modelY > 436 && modelY < 588){
						takeQuizBtnScale = 1.1;
					}
				}
				break;
			case "quiz":
				//----------     BACK BUTTON     ----------
				if(modelX > 652 && modelX < 829){
					if(modelY > 606 && modelY < 700){
						backBtnScale = 1.1;
					}
				}
				//----------     NEXT BUTTON     ----------
				if(modelX > 1108 && modelX < 1266){
					if(modelY > 606 && modelY < 704){
						nextBtnScale = 1.1;
					}
				}
				activeSliderObject[0].checkCollision(modelX,modelY);
				break;
		}



	}//End of onTouch

	//********************************
	//******     ON RELEASE     ******
	//********************************
	function onRelease(e){
		window.scrollTo(0,1);
		e.preventDefault();

		var modelY = clickY * (canvas.height / canvas.offsetHeight);
		var modelX = clickX * (canvas.width / canvas.offsetWidth);

		switch(GAME_STATE){
			case "title":

				if(modelX > 202 && modelX < 422){
					if(modelY > 436 && modelY < 588){
						takeQuizBtnScale = 1;
						changeState();
					}
				}
				break;

			case "quiz":
				//----------     BACK BUTTON     ----------
				if(modelX > 652 && modelX < 829){
					if(modelY > 606 && modelY < 700){
						backBtnScale = 1;
					}
				}
				//----------     NEXT BUTTON     ----------
				if(modelX > 1108 && modelX < 1266){
					if(modelY > 606 && modelY < 704){
						nextBtnScale = 1;
						calculateAnswerPercent();
					}
				}
				//----------     LETTING GO OF SLIDER     ----------
				if(activeSliderObject[0].active === true){
					activeSliderObject[0].active = false;
				}
				break;
		}
		
	}//End of onrelease	


	//*****************************
	//******     ON MOVE     ******
	//*****************************
	function onMove(e){
		window.scrollTo(0,1);
		e.preventDefault();

		moveX = e.clientX - offsetX;
		moveY = e.clientY - offsetY;

		var modelY = moveY * (canvas.height / canvas.offsetHeight);
		var modelX = moveX * (canvas.width / canvas.offsetWidth);

		takeQuizBtnScale = 1;
		backBtnScale = 1;
		nextBtnScale = 1;

		switch(GAME_STATE){
			case "title":

				if(modelX > 202 && modelX < 422){
					if(modelY > 436 && modelY < 588){
						takeQuizBtnScale = 1.1;
					}
				}
				break;

			case "quiz":
				//----------     BACK BUTTON     ----------
				if(modelX > 652 && modelX < 829){
					if(modelY > 606 && modelY < 700){
						backBtnScale = 1.1;
					}
				}
				//----------     NEXT BUTTON     ----------
				if(modelX > 1108 && modelX < 1266){
					if(modelY > 606 && modelY < 704){
						nextBtnScale = 1.1;
					}
				}
				//----------     MOVING SLIDER     ----------
				if(activeSliderObject[0].active === true){
					activeSliderObject[0].x = modelX - activeSliderObject[0].width / 2;
					if(activeSliderObject[0].x < activeSliderObject[0].xMin){
						activeSliderObject[0].x = activeSliderObject[0].xMin
					}
					if(activeSliderObject[0].x > activeSliderObject[0].xMax){
						activeSliderObject[0].x = activeSliderObject[0].xMax
					}
				}
				break;

		}

	}//End of on Move

//   /$$$$$$$$                              /$$     /$$                              
//  | $$_____/                             | $$    |__/                              
//  | $$    /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
//  | $$$$$| $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
//  | $$__/| $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$ 
//  | $$   | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
//  | $$   |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
//  |__/    \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|_______/ 
//    
	//*******************************
	//******     WRAP TEXT     ******
	//*******************************
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(" ");
		var line = "";
		for(var n = 0; n < words.length; n++) {
		  var testLine = line + words[n] + " ";
		  var metrics = context.measureText(testLine);
		  var testWidth = metrics.width;
		  if(testWidth > maxWidth) {
			context.fillText(line, x, y);
			line = words[n] + " ";
			y += lineHeight;
		  }
		  else {
			line = testLine;
		  }
		}
		context.fillText(line, x, y);
	};//End of wrap text

	//***************************************
	//******     DRAW SCALED IMAGE     ******
	//***************************************
	function drawScaledImage(image, scale, x, y){
		var centerX = image.width / 2 * scale;
		var centerY = image.height / 2 * scale;
		c.save();
			c.translate(x - centerX, y - centerY);
			c.scale(scale,scale);
			c.drawImage(image,0,0);
		c.restore();
	};//End of draw scaled image

	//**********************************************
	//******     CALCULATE ANSWER PERCENT     ******
	//**********************************************
	function calculateAnswerPercent(){
		var sliderPosition = activeSliderObject[0].x + activeSliderObject[0].width / 2;
		percentageResult = (sliderPosition - activeSliderObject[0].xMin) / activeSliderObject[0].sliderLength;

		console.log("Length: " + activeSliderObject[0].sliderLength);
		console.log("Position: " + sliderPosition);
		console.log("Result: " + Math.floor(percentageResult * 100) + "%");
	};


	//****************************
	//******     RESIZE     ******
	//****************************
	window.onresize = function() {
		//Needed to update offsets since it's part of the calculation
		offsetX = container.offsetLeft;
		offsetY = container.offsetTop;
	};
}());//End of IIFE