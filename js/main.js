$(function(){
	

	var musicPlayer,
//		state = false,
		oAudio = $('#h5audio_media')[0];
	var audioPercentages;
		
	musicPlayer = {
		playState : function(state){
			if(state){
				$('.m_playbtn').find('img').attr('src','img/down.png');
				$('.m_playbtn').find('img').attr('title','暂停');
				
				console.log('播放');
			}else{
				$('.m_playbtn').find('img').attr('src','img/Play.png');
				$('.m_playbtn').find('img').attr('title','播放');
				console.log('暂停');
			}
		},
		playerBtn : function(){
			playBtn();
		},
		upBtn : function(){
			
		},
		downBtn : function(){
			
		},
		progress : function(){
			$('.m_progressbarbg').on('click',function(){
				oAudio.play();
				musicPlayer.playState(!oAudio.paused);
				progressbar();
				audioTime();
				show_coords(event);
				function show_coords(event){
					var x,progressPercentage,progressWidth
					x = event.offsetX;
					progressWidth = $('.m_progressbarbg').width();
					progressPercentage = ((x / progressWidth) * 100).toFixed(0);
					oAudio.currentTime = progressPercentage / 100 * oAudio.duration;
					console.log(progressPercentage+'%');
//					alert("X 坐标: " + x)
				}
			})
		}
	}
	
	function playBtn(){		// 播放、暂停按钮
		$('.m_playbtn').on('click',function(){
			if(oAudio.paused){
				oAudio.play();
				musicPlayer.playState(!oAudio.paused);
				progressbar();
				audioTime();
			}else{
				oAudio.pause();
				musicPlayer.playState(!oAudio.paused);
				
			}
			
		})
	}
	function progressbar(){		// 进度条
		var time = setInterval(barstart,1000);;
//		console.log('总时间：'+oAudio.currentTime);
//		console.log('当前时间：'+oAudio.duration);
		function barstart(){	// 进度条定时函数
			audioPercentages = ((oAudio.currentTime / oAudio.duration) * 100).toFixed(0);
			$('.m_progressbars').width(audioPercentages +'%');
			$('.m_progressbar_o').css('left',audioPercentages +'%');
			console.log(audioPercentages +'%');
			console.log(oAudio.played.end(0) +'-----');
			if(oAudio.paused==true && oAudio.ended==false){
				clearInterval(time);
			}else if(oAudio.ended){
				clearInterval(time);
				$('.m_progressbars').width('0%');
				$('.m_progressbar_o').css('left','0%');
				musicPlayer.playState(!oAudio.ended);
			}
		}
	}
	
	function audioTime(){	// 播放器时间
		var auTime = (oAudio.duration).toFixed(0)-1;
		
		//----------------总时间--------------------------------------
		(function totalTime(){
			var h = 0,
				s = 0;
		    //计算分钟
		    //算法：将秒数除以60，然后下舍入，既得到分钟数
		    h  =   Math.floor(auTime / 60);
		    //计算秒
		    //算法：取得秒%60的余数，既得到秒数
		    s  =   auTime % 60;
		    //将变量转换为字符串
		    h    +=    '';
		    s    +=    '';
		    //如果只有一位数，前面增加一个0
		    h  =   (h.length == 1) ?'0' + h:h;
		    s  =   (s.length == 1) ?'0' + s:s;
		    $('.m_totaltime').html(h + ':' + s);
		})();
		//----------------当前时间--------------------------------------
		(function currentTime(){
			var h = 0,
				s = 0;
		    var currentTimes = setInterval(cTime,1000);
		    function cTime(){
		    	var cuTime = (oAudio.currentTime).toFixed(0);
		    	h = Math.floor(cuTime / 60);
		    	s = cuTime % 60;
		    	//将变量转换为字符串
			    h    +=    '';
			    s    +=    '';
		    	//如果只有一位数，前面增加一个0
		    	h  =   (h.length==1)?'0'+h:h;
		    	s  =   (s.length==1)?'0'+s:s;
		    	
		    	$('.m_currenttime').html(h+':'+s);
//		    	console.log((oAudio.currentTime).toFixed(0));
//		    	console.log($('.m_currenttime').text());
//		    	console.log($('.m_totaltime').text());
		    	if(oAudio.paused==true && oAudio.ended==false){
//		    		f = h;
//		    		m = s;
			    	clearInterval(currentTimes);
			    	console.log('on+++++++++++');
			    	
			    }else if(oAudio.ended){
			    	console.log('播放停止'+oAudio.paused);
			    	clearInterval(currentTimes);
			    	$('.m_currenttime').html('00:00');
			    }
		    }
		})();
	}
	
	musicPlayer.playerBtn();
	musicPlayer.progress();
	musicPlayer.playState(!oAudio.paused);
	
})
