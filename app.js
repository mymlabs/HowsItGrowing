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
		filesToLoad = 17;
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
		printBtnScale = 1;

		amplitude = 0.02;
		period = 2000;
		titleScreenText = "Discover your place in the garden and learn positive coping strategies by taking this personality quiz.";

		hostURL = window.location.pathname;
		console.log(hostURL);

		currentQuestion = 1;
		

		percentageResult = 0;

		activeFadeObjects = [];
		activeTitleObjects = [];
		activeSliderObject = [];
		activePopUps = [];

		questionText = "";
		questions = [
			"I make time for self care, mentally and physically.",
			"I say no when I am overworked and/or tired.",
			"I do the things I love.",
			"I am comfortable reaching out for help when I need it.",
			"I know who I can go to for help.",
			"I know when I need to seek help from others.",
			"I know what I can do to make myself feel better or get out of a slump.",
			"I can sit with uncomfortable feelings.",
			"I am comfortable communicating my feelings to others.",
			"I have expectations of how others should treat me and I stand up for myself when needed.",
			"I am comfortable setting limits with others.",
			"I am open to other people’s boundaries and limits.",
			"I often think about what I could have done differently in situations that don’t go how I hoped.",
			"I like to plan ahead and think of the best way to approach things.",
			"I give myself time to reflect and process on the days events."
		]
		totalQuestions = questions.length;
		currentPlant = 0;
		questionThemeText = "";

		plantValues = [];
		finalScores = [];
		finalPlant = 0;
		finalPlantName = "";
		plantText_01 = "";
		plantText_02 = "";
		pdfUrl = "";

		quizBtnScale = 1;
		twtBtnScale = 1;
		fbBtnScale = 1;

		endScreenSlideNum = 1;

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
		//youthExpertsLogo = new Image();
		gameLogo = new Image();
		takeQuizBtn = new Image();
		quizBG = new Image();
		sliderBG = new Image();
		sliderControl = new Image();
		backBtn = new Image();
		nextBtn = new Image();
		doneBtn = new Image();
		cactusPlant = new Image();
		palmPlant = new Image();
		lavenderPlant = new Image();
		moneyPlant = new Image();
		snakePlant = new Image();
		printTipsBtn = new Image();
		retakeQuizBtn = new Image();
		shareBtn = new Image();
		youthExpertsSM = new Image();
		cscLogo = new Image();
		canadaLogo = new Image();
		fbLink = new Image();
		twitterLink = new Image();
		//----------     ADD LISTENERS     ----------
		background.onload = updateLoading();
		//youthExpertsLogo.onload = updateLoading();
		gameLogo.onload = updateLoading();
		takeQuizBtn.onload = updateLoading();
		quizBG.onload = updateLoading();
		sliderBG.onload = updateLoading();
		sliderControl.onload = updateLoading();
		backBtn.onload = updateLoading();
		nextBtn.onload = updateLoading();
		doneBtn.onload = updateLoading();
		cactusPlant.onload = updateLoading();
		palmPlant.onload = updateLoading();
		lavenderPlant.onload = updateLoading();
		moneyPlant.onload = updateLoading();
		snakePlant.onload = updateLoading();
		printTipsBtn.onload = updateLoading();
		retakeQuizBtn.onload = updateLoading();
		shareBtn.onload = updateLoading();
		youthExpertsSM.onload = updateLoading();
		cscLogo.onload = updateLoading();
		canadaLogo.onload = updateLoading();
		fbLink.onload = updateLoading();
		twitterLink.onload = updateLoading();
		//----------     SET SOURCES    ----------
		background.src = "images/background.png";
		//youthExpertsLogo.src = "images/youthexperts_lg.png";
		gameLogo.src = "images/game_logo.png";
		takeQuizBtn.src = "images/take_quiz_btn.png";
		quizBG.src = "images/quiz_bg.png";
		sliderBG.src = "images/slider_bg.png";
		sliderControl.src = "images/slider_control.png";
		backBtn.src = "images/back_button.png";
		nextBtn.src = "images/next_button.png";
		doneBtn.src = "images/done_button.png";
		cactusPlant.src = "images/cactus_plant.png";
		palmPlant.src = "images/palm_plant.png";
		lavenderPlant.src = "images/lavender_plant.png";
		moneyPlant.src = "images/money_plant.png";
		snakePlant.src = "images/snake_plant.png";
		printTipsBtn.src = "images/print_tips.png";
		retakeQuizBtn.src = "images/retake_quiz_btn.png";
		shareBtn.src = "images/share_btn.png";
		youthExpertsSM.src = "images/youthexperts_sm.png";
		cscLogo.src = "images/csc_logo.png";
		canadaLogo.src = "images/canada_logo.png";
		fbLink.src = "images/fb_link.png";
		twitterLink.src = "images/twt_link.png";
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
				/*container.addEventListener("mousemove",onMove);*/
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
			that.startX = 946;
			that.x = 946;
			that.y = 340;
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

		titlePopUp = function(srcImage,xPos,yPos){
			var that = this;
			that.image = srcImage;
			that.x = xPos;
			that.y = yPos;
			that.scale = .2;
			that.scaleTarget = 1;
			that.scaleVel = 0;
			that.width = that.image.width;
			that.height = that.image.height;
			that.timer = new Date().getTime(), 
			that.life = 1200;
			that.active = true;
			that.update = function(){
				var timerCheck = new Date().getTime();
				if(timerCheck >= that.timer + that.life){
					that.active = false;
				}else{
					var distance = that.scaleTarget - that.scale;
					var accel = distance * targetSpring;
					that.scaleVel += accel;
					that.scaleVel *= targetFriction;
					that.scale += that.scaleVel;
				}
				if(that.active == true){
					c.save();
						var drawPositionX = Math.floor(-(that.width * that.scale) / 2);
						var drawPositionY = Math.floor(-(that.height * that.scale) / 2);
						c.translate(that.x + drawPositionX,that.y + drawPositionY);
						c.scale(that.scale,that.scale);
						c.drawImage(that.image,0,0);
					c.restore();
				}else{
					c.drawImage(that.image,that.x - that.width/2,that.y - that.height/2);
				}
			}
		}//End of title popup
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
			/*c.drawImage(youthExpertsLogo,953,611);*/

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

			c.drawImage(youthExpertsSM,17,629);
			c.drawImage(canadaLogo,275,650);
			c.drawImage(cscLogo,410,635);
			

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		}

		if(GAME_STATE === "quiz"){
			c.drawImage(background,0,0);
			//c.drawImage(youthExpertsLogo,953,611);
			c.drawImage(gameLogo,25,21);

			activeTitleObjects.forEach(function(titleObject,index){
				titleObject.update();
			});

			c.drawImage(sliderBG,746,361);

			activeSliderObject[0].update();

			c.textAlign = "center";
			c.fillStyle = "#000";
			c.font = "25px arial, sans-serif";

			c.fillText("Question " + currentQuestion + " of " + totalQuestions + ":",962,40);
			c.fillText("Not at all",745,440);
			c.fillText("Yes, definitely",1167,440);
			c.fillText("Sometimes",959,440);

			c.fillStyle = "#05900e";
			c.font = "32px arial, sans-serif";
			c.fillText(questionThemeText,954,112);

			c.fillStyle = "#000";
			c.font = "bold 34px arial, sans-serif";
			wrapText(c,questionText,956,230,536,35);

			if(currentQuestion > 1){
				drawScaledImage(backBtn,backBtnScale,741,653);
			}
			if(currentQuestion < totalQuestions){
				drawScaledImage(nextBtn,nextBtnScale,1187,655);
			}else{
				drawScaledImage(doneBtn,nextBtnScale,1187,655);
			}

			c.drawImage(youthExpertsSM,17,629);
			c.drawImage(canadaLogo,275,650);
			c.drawImage(cscLogo,410,635);

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		}

		if(GAME_STATE === "endscreen"){
			c.drawImage(background,0,0);

			c.fillStyle = "#FFF";
			c.save();
				c.globalAlpha = 0.8;
				c.fillRect(0,0,screenWidth,screenHeight);
			c.restore();

			activePopUps.forEach(function(popUpObject,index){
				popUpObject.update();
			});

			c.textAlign = "center";
			c.fillStyle = "#000";
			c.font = "25px arial, sans-serif";
			c.fillText("You are a...",299,60);

			c.font = "49px arial, sans-serif";
			c.fillText(finalPlantName,291,120);

			//*****************************
			//******     SLIDE 1     ******
			//*****************************
			if(endScreenSlideNum === 1){
				c.textAlign = "left";
				c.font = "27px arial, sans-serif";

				switch(finalPlant){
					case 0:
						wrapText(c,plantText_01,624,205,612,29);
						wrapText(c,plantText_02,624,424,612,29);
						break;
					case 1:
						wrapText(c,plantText_01,624,205,612,29);
						wrapText(c,plantText_02,624,450,612,29);
						break;
					case 2:
						wrapText(c,plantText_01,624,205,612,29);
						wrapText(c,plantText_02,624,398,612,29);
						break;
					case 3:
						wrapText(c,plantText_01,624,205,612,29);
						wrapText(c,plantText_02,624,372,612,29);
						break;
					case 4:
						wrapText(c,plantText_01,624,205,612,29);
						wrapText(c,plantText_02,624,398,612,29);
						break;
				}
				drawScaledImage(nextBtn,nextBtnScale,1187,655);
			}

			//*****************************
			//******     SLIDE 2     ******
			//*****************************
			if(endScreenSlideNum === 2){
				c.textAlign = "left";
				c.font = "27px arial, sans-serif";
				//----------     SNAKE PLANT     ---------
				if(finalPlant === 0){
					wrapText(c,
						"\u2022 Set three levels of priorities: things I must do, things I should do (but can wait) and things that can wait indefinitely.",
						624,116,
						612,29
						);

					wrapText(c,
						"\u2022 Learn to say “no” sometimes. It’s okay. This will give you the opportunity to spend time doing the things that are meaningful to you.",
						624,218,
						612,29
						);

					wrapText(c,
						"\u2022 Self care is different for everyone. Try out new things to find what works for you. You might need to change it up depending on your mood and energy level.",
						624,319,
						612,29
						);

					wrapText(c,
						"\u2022 Get enough sleep; it’s important for your physical and mental well-being. See a doctor if you experience sleeping problems.",
						624,451,
						612,29
						);

					wrapText(c,
						"\u2022 Maintain a balance between work and play. Paint, draw, collage, write or dance!",
						624,555,
						612,29
						);
				}
				//----------     CACTUS PLANT     ---------
				if(finalPlant === 1){
					wrapText(c,
						"\u2022 Who do you feel comfortable talking with? Decide who you trust and can communicate with openly.",
						624,116,
						612,29
						);

					wrapText(c,
						"\u2022 Make sure you find a quiet, calm space for face to face conversation.",
						624,218,
						612,29
						);

					wrapText(c,
						"\u2022 Have an idea of what you need help with before you start the conversation. If you’re not sure you could say something like “I’m having a hard time with _______. Can you help me?”",
						624,290,
						612,29
						);

					wrapText(c,
						"\u2022 Make notes of what you want to say and what you’re asking for, it will help you stay on track.",
						624,422,
						612,29
						);

					wrapText(c,
						"\u2022 Be sure to thank those who help you.",
						624,497,
						612,29
						);
				}
				//----------     MONEY TREE     ---------
				if(finalPlant === 2){
					wrapText(c,
						"\u2022 While sharing your negative emotions might seem scary, it will help you grow and flourish.",
						624,116,
						612,29
						);

					wrapText(c,
						"\u2022 It’s hard, but the first step is accepting your emotions and acknowledging them in a non-judgmental way.",
						624,189,
						612,29
						);

					wrapText(c,
						"\u2022 Try to reflect on your day. Did anything happen that contributed to how you’re feeling now?",
						624,290,
						612,29
						);

					wrapText(c,
						"\u2022 Sometimes reflecting on and accepting your emotions is enough to make you feel better, sometimes it’s not. Try to find a release like talking to a friend or writing.",
						624,365,
						612,29
						);

					wrapText(c,
						"\u2022 Recognize that sometimes negative emotions are too much for you to handle on your own. Reach out to someone you trust to support you.",
						624,499,
						612,29
						);
				}
				//----------     LAVENDER PLANT     ---------
				if(finalPlant === 3){
					wrapText(c,
						"\u2022 Don’t be afraid to say no. A good friend will understand why rather than pressuring you.",
						624,116,
						612,29
						);

					wrapText(c,
						"\u2022 Pretending everything is alright when it isn’t, doesn’t help anyone. If you’re upset, try to put the feeling into words. Write it out if you need to!",
						624,188,
						612,29
						);

					wrapText(c,
						"\u2022 Make it a goal to speak to others respectfully and expect the same in return. Let people know if you are offended by what they say.",
						624,290,
						612,29
						);

					wrapText(c,
						"\u2022 Don’t change who you are to please someone.",
						624,393,
						612,29
						);

					wrapText(c,
						"\u2022 Take time for yourself. There’s nothing wrong with wanting to be alone sometimes. Self care is important within relationships.",
						624,440,
						612,29
						);
				}
				//----------     PALM PLANT     ----------
				if(finalPlant === 4){
					wrapText(c,
						"\u2022 Schedule time for self reflection and find a quiet, comfortable space to do it in.",
						624,116,
						612,29
						);

					wrapText(c,
						"\u2022 Choose a time when you have the energy to self- reflect and are in a positive mood, being in the right frame of mind will help you dig deep.",
						624,189,
						612,29
						);

					wrapText(c,
						"\u2022 Decide what you want to reflect on; how your past has impacted your present day, what you do well, or what you’ve achieved.",
						624,290,
						612,29
						);

					wrapText(c,
						"\u2022 Self-reflection can bring up overwhelming feelings, make a list of supportive people and reach out to them when necessary.",
						624,393,
						612,29
						);

					wrapText(c,
						"\u2022 Journaling is a great way to learn new things about yourself and keep track of your personal growth.",
						624,497,
						612,29
						);
				}
				drawScaledImage(nextBtn,nextBtnScale,1187,655);
			}

			//*****************************
			//******     SLIDE 3     ******
			//*****************************
			if(endScreenSlideNum === 3){
				c.textAlign = "left";
				c.font = "27px arial, sans-serif";
				wrapText(c,
					"Thanks for playing! We hope that you learned a little bit about yourself today!",
					624,116,612,29);
				wrapText(c,
					"Shout out to our Windsor Crew for pouring their dedication into this creation:",
					624,189,612,29);

				wrapText(c,
					"Ahmed, Sophia, Tyler, Cole, Erica, Pavneet, Daisy, Shaawnonoo, Matthew, Diana, Ally & Aleyna",
					624,261,612,29);

				c.drawImage(shareBtn, 726, 357);
				drawScaledImage(twitterLink,twtBtnScale,957,390);
				drawScaledImage(fbLink,fbBtnScale,1065,390);

				drawScaledImage(printTipsBtn,printBtnScale,919,515);
				drawScaledImage(retakeQuizBtn,quizBtnScale,919,620);
			}

			c.drawImage(youthExpertsSM,17,629);
			c.drawImage(canadaLogo,275,650);
			c.drawImage(cscLogo,410,635);

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});

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
				questionText = questions[currentQuestion - 1];
				setThemeText(currentQuestion);
				activeFadeObjects = [];
				GAME_STATE = "quiz";
				break;

			case "quiz":
				calculateEndPlant();
				activeFadeObjects = [];
				activeFadeObjects[0] = new screenFade(1,0,"#FFF");
				GAME_STATE = "endscreen";
				break;
			case "endscreen":
				activeFadeObjects[0] = new screenFade(1,0,"#FFF");
				GAME_STATE = "title";
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
				container.addEventListener("mousemove",onMove);
				container.addEventListener("mouseup",onRelease);
			}else{
				INPUT_TYPE = "touch";
				container.removeEventListener("mousedown",onTouch);
				container.addEventListener("touchmove",onMove);
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

			case "endscreen":

				if(endScreenSlideNum === 1){
				//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1.1;
						}
					}
				}

				if(endScreenSlideNum === 2){
					//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1.1;
						}
					}
				}

				if(endScreenSlideNum === 3){
					//----------     SHARE BUTTON     ----------
					if(modelY > 346 && modelY < 434){
						//----------    TWITTER    ----------
						if(modelX > 913 && modelX < 1001){
							twtBtnScale = 1.1;
						}	
						//----------     FACEBOOK    ----------
						if(modelX > 1021 && modelX < 1109){
							fbBtnScale = 1.1;
						}
					}
					//----------     PRINT TIPS BUTTONS     ----------
					if(modelX > 677 && modelX < 1161){
						if(modelY > 476 && modelY < 556){
							printBtnScale = 1.1;
						}
					}
					//----------     RETAKE BUTTONS     ----------
					if(modelX > 769 && modelX < 1069){
						if(modelY > 584 && modelY < 656){
							quizBtnScale = 1.1;
						}
					}
				}
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
						if(currentQuestion > 1){
							backBtnScale = 1;
							currentQuestion--;
							questionText = questions[currentQuestion - 1];
							/*console.log();*/

/*							var thisPercentage = plantValues[currentQuestion - 1] / 100;
							var pixelValue = thisPercentage * activeSliderObject[0].sliderLength;
							var newPosition = pixelValue + activeSliderObject[0].xMin;
							console.log(thisPercentage + " of " + activeSliderObject[0].sliderLength + " is " + pixelValue);
							activeSliderObject[0].x = newPosition;*/
							activeSliderObject[0].x = ((plantValues[currentQuestion - 1] / 100)
															* activeSliderObject[0].sliderLength)
															+ activeSliderObject[0].xMin;
							//activeSliderObject[0].x = thisPercentage * activeSliderObject[0].sliderLength) + activeSliderObject[0].xMin;
						}
					}
				}
				//----------     NEXT BUTTON     ----------
				if(modelX > 1108 && modelX < 1266){
					if(modelY > 606 && modelY < 704){
						if(currentQuestion <= totalQuestions){
							nextBtnScale = 1;
							calculateAnswerPercent();

							if(currentQuestion < totalQuestions){
								currentQuestion++;
								if(currentQuestion <= plantValues.length){
									activeSliderObject[0].x = ((plantValues[currentQuestion - 1] / 100)
																* activeSliderObject[0].sliderLength)
																+ activeSliderObject[0].xMin;
								}else{
									activeSliderObject[0].x = activeSliderObject[0].startX;
								}
								
								questionText = questions[currentQuestion - 1];
								setThemeText(currentQuestion);
							}else{
/*								activeFadeObjects[0] = new screenFade(0,1,"#FFF");
								setTimeout(function(){
									changeState();
								},800);*/
								changeState();
							}

						}
					}
				}
				//----------     LETTING GO OF SLIDER     ----------
				if(activeSliderObject[0].active === true){
					activeSliderObject[0].active = false;
				}else{
					if(modelY > 360 && modelY < 385){
						if(modelX > 746 && modelX < 1164){
							activeSliderObject[0].x = modelX - activeSliderObject[0].width / 2;
						}
					}

				}
				break;
			case "endscreen":

				if(endScreenSlideNum === 1){
					//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1;
							endScreenSlideNum++;
							break;
						}
					}
				}
				if(endScreenSlideNum === 2){
					//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1;
							endScreenSlideNum++;
						}
					}	
				}
				if(endScreenSlideNum === 3){
					if(modelY > 346 && modelY < 434){
						//----------    TWITTER    ----------
						if(modelX > 913 && modelX < 1001){
							twtBtnScale = 1;
							window.open('https://twitter.com/intent/tweet?url=https://youthexperts.ca/howsitgrowing&text=What plant are you? Find out with this personality quiz and get helpful tips. %23HowsItGrowing %23youthexperts', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');

						}	
						//----------     FACEBOOK    ----------
						if(modelX > 1021 && modelX < 1109){
							fbBtnScale = 1;
							window.open('https://www.facebook.com/sharer/sharer.php?u=http%3A//youthexperts.ca&t=Hows it Growing?', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
						}
					}

					//----------     PRINT TIPS BUTTONS     ----------
					if(modelX > 677 && modelX < 1161){
						if(modelY > 476 && modelY < 556){
							printBtnScale = 1;
							window.open(pdfUrl); 
						}
					}
					//----------     RETAKE BUTTONS     ----------
					if(modelX > 769 && modelX < 1069){
						if(modelY > 584 && modelY < 656){
							quizBtnScale = 1;
							resetQuiz();
							changeState();
						}
					}
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
		printBtnScale = 1;
		twtBtnScale = 1;
		fbBtnScale = 1;
		quizBtnScale = 1;

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
			case "endscreen":

				if(endScreenSlideNum === 1){
					//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1.1;
						}
					}
				}
				if(endScreenSlideNum === 2){
					//----------     NEXT BUTTON     ----------
					if(modelX > 1108 && modelX < 1266){
						if(modelY > 606 && modelY < 704){
							nextBtnScale = 1.1;
						}
					}	
				}
				if(endScreenSlideNum === 3){
					if(modelY > 346 && modelY < 434){
						//----------    TWITTER    ----------
						if(modelX > 913 && modelX < 1001){
							twtBtnScale = 1.1;
						}	
						//----------     FACEBOOK    ----------
						if(modelX > 1021 && modelX < 1109){
							fbBtnScale = 1.1;
						}
					}
					//----------     PRINT TIPS BUTTONS     ----------
					if(modelX > 677 && modelX < 1161){
						if(modelY > 476 && modelY < 556){
							printBtnScale = 1.1;
						}
					}
					//----------     RETAKE BUTTONS     ----------
					if(modelX > 769 && modelX < 1069){
						if(modelY > 584 && modelY < 656){
							quizBtnScale = 1.1;
						}
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
		//adjust for my wonky math
		percentageResult = percentageResult * 100 - 3;
		if(percentageResult < 0){
			percentageResult = 0;
		}
		if(percentageResult > 100){
			percentageResult = 100;
		}
		if(plantValues.length < currentQuestion){
			/*console.log('adding new value');*/
			plantValues.push(Math.floor(percentageResult));
		}else{
			/*console.log('updating array');*/
			plantValues[currentQuestion - 1] = percentageResult;
		}
	};

	//*****************************************
	//******     CALCULATE END PLANT     ******
	//*****************************************
	function calculateEndPlant(){

		for(ii=0;ii<5;ii++){
			var plantTrack = 0;
			for(jj=0;jj<3;jj++){
				plantTrack += plantValues[jj + (ii*3)];
			}
			plantTrack = Math.floor(plantTrack /= 3);
			//console.log('total for plant ' + ii + ": " + plantTrack);
			finalScores[ii] = plantTrack;
		}

/*		console.log(finalScores);
		console.log(Math.max.apply(null,finalScores));*/
		finalPlant = finalScores.indexOf(Math.max.apply(null,finalScores));
		//console.log(finalPlant + 1);



		switch(finalPlant){
			case 0:
				finalPlantName = "Snake Plant!";
				activePopUps[0] = new titlePopUp(snakePlant,298,367);
				plantText_01 = "Snake plants are hardy and resilient. They can live with very little sunlight and water. Despite this, they give a lot back to their environment, purifying the air and producing oxygen. In Feng Shui snake plants are associated with protection and are a great addition to any home!";
				plantText_02 = "Just like the snake plant you might find yourself giving a lot to others. You give a lot of your time and energy to others and sometimes you are at risk of neglecting your own self care needs.";
				pdfUrl = "https://mindyourmind.ca/apps/HowsItGrowing/Hows-It-Growing_Snake.pdf";
				break;
			case 1:
				finalPlantName = "Cactus!";
				activePopUps[0] = new titlePopUp(cactusPlant,298,367);
				plantText_01 = "Cacti are a symbol of warmth and protection due to their spikes and the fact that they grow in sunny climates and produce beautiful flowers. They don’t need a lot of water to grow and their shallow root systems help them absorb any available water quickly. That being said these plants need a lot of sun in order to stay healthy and continue growing.";
				plantText_02 = "Similar to a cactus, people see you as independent, strong and determined.";
				pdfUrl = "https://mindyourmind.ca/apps/HowsItGrowing/Hows-It-Growing_Cactus.pdf";
				break;
			case 2:
				finalPlantName = "Money Tree!";
				activePopUps[0] = new titlePopUp(moneyPlant,298,367);
				plantText_01 = "Money trees are associated with positive energy, luck and prosperity. They thrive with consistency, requiring lots of sunlight, pruning and regular watering. Money trees are grounded and provide shelter for those around them.";
				plantText_02 = "Like the money tree you are positive and focused on caring for those around you. It can be hard for you to sit with and express negative emotions.";
				pdfUrl = "https://mindyourmind.ca/apps/HowsItGrowing/Hows-It-Growing_Money.pdf";
				break;
			case 3:
				finalPlantName = "Lavender Plant!";
				activePopUps[0] = new titlePopUp(lavenderPlant,298,367);
				plantText_01 = "Lavender is associated with healing and calming, as a result it is used extensively in aromatherapy. While this plant is very tough, it needs full sun and the soil needs to be well drained.";
				plantText_02 = "Just like lavender you have a calming presence to those around you. People may often come to you to vent their problems or ask for advice. Sometimes you might find yourself mulling over other people’s problems hours after you talked to them. Helping others is great but it may be necessary to set boundaries.";
				pdfUrl = "https://mindyourmind.ca/apps/HowsItGrowing/Hows-It-Growing_Lavender.pdf";
				break;
			case 4:
				finalPlantName = "Palm Plant!";
				activePopUps[0] = new titlePopUp(palmPlant,298,367);
				plantText_01 = "Palm plants are associated with victory, peace and tropical vacations. These plants need warmth, lots of sun and just the right amount of water. They need to be fertilized during the dormant season so can they keep growing strong.";
				plantText_02 = "Just as the palm takes a rest during the dormant season and needs nourishment, you need to do this for yourself as well.";
				pdfUrl = "https://mindyourmind.ca/apps/HowsItGrowing/Hows-It-Growing_Palm.pdf";
				break;
		}
	}

	//***********************************
	//*****     SET THEME TEXT     ******
	//***********************************
	setThemeText = function(questionNum){
		if(questionNum < 4){
			questionThemeText = "Prioritizing your self care.";
		}
		if(questionNum > 3 && questionNum < 7){
			questionThemeText = "Asking for help when you need it.";
		}
		if(questionNum > 6 && questionNum < 10){
			questionThemeText = "Coping with uncomfortable emotions.";
		}
		if(questionNum > 9 && questionNum < 13){
			questionThemeText = "Building boundaries";
		}
		if(questionNum > 12){
			questionThemeText = "Reflecting on your life";
		}
	};


	resetQuiz = function(){
		currentQuestion = 1;
		percentageResult = 0;

		activeFadeObjects = [];
		activeTitleObjects = [];
		activeSliderObject = [];
		activePopUps = [];

		plantValues = [];
		finalScores = [];

		finalPlant = 0;
		finalPlantName = "";
		plantText_01 = "";
		plantText_02 = "";
		pdfUrl = "";
		paragraphYPos = 0;

		quizBtnScale = 1;
		twtBtnScale = 1;
		fbBtnScale = 1;
		takeQuizBtnScale = 1;
		nextBtnScale = 1;
		backBtnScale = 1;
		printBtnScale = 1;

		endScreenSlideNum = 1;

	};

	//****************************
	//******     RESIZE     ******
	//****************************
	window.onresize = function() {
		console.log("orientation");
		//Needed to update offsets since it's part of the calculation
		offsetX = container.offsetLeft;
		offsetY = container.offsetTop;
	};
}());//End of IIFE