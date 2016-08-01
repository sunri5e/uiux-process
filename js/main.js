"use strict";

/* --------------
  Playing video to canvas 
  ----------------*/

var receiver = document.getElementById('receiver'),
    ctx = receiver.getContext('2d'),
    video = document.getElementById('translator'),
    videoSource = {
      'scene1': {
        'sources' : [
                      ['video/scene1/ch1.mp4', 'video/scene1/ch1.webm', 'video/scene1/ch1.ogv'],
                      ['video/scene1/ch2.mp4', 'video/scene1/ch2.webm', 'video/scene1/ch2.ogv'],
                      ['video/scene1/ch3.mp4', 'video/scene1/ch3.webm', 'video/scene1/ch3.ogv'],
                      ['video/scene1/ch4.mp4', 'video/scene1/ch4.webm', 'video/scene1/ch4.ogv'],
                      ['video/scene1/ch5.mp4', 'video/scene1/ch5.webm', 'video/scene1/ch5.ogv']
                    ],
        'loop' : true
      },
      'scene2': {
        'sources' : [
                      ['video/scene2/ep1.mp4', 'video/scene2/ep1.webm', 'video/scene2/ep1.ogv']
                    ]
      },
      'scene3': {
        'sources' : [
                      ['video/scene3/ep2.mp4', 'video/scene3/ep2.webm', 'video/scene3/ep2.ogv']
                    ],
        'outro' : document.getElementById('blueprint')
      },
      'scene4': {
        'intro' : document.getElementById('blueprint'),
        'sources' : [
                      ['video/scene4/printing.mp4', 'video/scene4/printing.webm', 'video/scene4/printing.ogv']
                    ]
      },
      'scene5': {
        'sources' : [
                      ['video/scene5/int1.mp4', 'video/scene5/int1.webm', 'video/scene5/int1.ogv'],
                      ['video/scene5/int2.mp4', 'video/scene5/int2.webm', 'video/scene5/int2.ogv'],
                      ['video/scene5/int3.mp4', 'video/scene5/int3.webm', 'video/scene5/int3.ogv']
                    ],
        'loop' : true
      },
      'scene6': {
        'sources' : [
                      ['video/scene6/gun.mp4', 'video/scene6/gun.webm', 'video/scene6/gun.ogv']
                    ]
      },
      'scene7': {
        'sources' : [
                      ['video/scene7/bang.mp4', 'video/scene7/bang.webm', 'video/scene7/bang.ogv']
                    ],
      },
      'scene8': {
        'sources' : [
                      ['video/scene8/hurricane.mp4', 'video/scene8/hurricane.webm', 'video/scene8/hurricane.ogv']
                    ],
        'images' : ['img/scene8/8_scene_barber_chair.jpg', 'img/scene8/8_scene_clothed_chair.jpg', 'img/scene8/8_scene_movie_chair.jpg', 'img/scene8/8_scene_space_chair.jpg', 'img/scene8/8_scene_woodn_chair.jpg'],
        'shift' : true
      }
    },
    i = 0,
    playingScene = 'scene1',
    currentVideoDuration,
    control = document.getElementsByClassName('scene-control'),
    textSections = getAllElementsWithAttribute('data-for'),
    sceneHandler = handleVideoSource(playingScene),
    hero = document.getElementById('hero');



function getAllElementsWithAttribute(attribute) {
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

function addClass(targetEl, newClass) {
  targetEl.classList.add(newClass);
}

function removeClass(targetEl, newClass) {
  targetEl.classList.remove(newClass);
}

function replaceClass(targetEl, unnecessaryClass, newClass) {
  if (!unnecessaryClass) {
    targetEl.className = '';
  } else {
    targetEl.classList.remove(unnecessaryClass);
  }

  if (!newClass) {
    targetEl.className = '';
  } else {
    targetEl.classList.add(newClass);
  }
}

// function for showing text
function showContentSection(arr, interimClass, newClass, skipItem) {
  var skippedItem;
  for (let i = 0; i < arr.length; i++) {
    addClass(arr[i], interimClass);
    removeClass(arr[i], 'is-open')
  };
  if (skippedItem) {
    replaceClass(skippedItem[0], 'is-open', interimClass);
  }

  setTimeout(function(){
    skippedItem = document.querySelectorAll('[data-for="'+skipItem+'"]');
    for (let i = 0; i < arr.length; i++) {
      replaceClass(arr[i], interimClass, newClass);
    };
    setTimeout(function(){
      if (skippedItem.length != 0) {
        replaceClass(skippedItem[0], newClass, 'is-open');
      }
    }, 250);
  }, 500);
}

function playVideo(scene, videoNum) {
  video.innerHTML = '';

  for (let j = 0; j < videoSource[scene].sources[videoNum].length; j++) {
    let sourceTag = document.createElement("source");

    sourceTag.setAttribute("src", videoSource[scene].sources[videoNum][j]);
    video.appendChild(sourceTag);
  }

  if (video.innerHTML == '') {
    console.log('Try load image!');
  } else {
    console.log('Have souces!');
  }

  video.load();
  video.play();

  video.onloadedmetadata = function() {
    currentVideoDuration = video.duration * 1000;
  };
}

function sceneOutro(outroEl, outroModifier, baseModifier) {
  video.onloadedmetadata = function() {
    currentVideoDuration = video.duration * 1000;
    setTimeout(function(){
      replaceClass(outroEl, 'is-hidden', outroModifier);

      if (baseModifier) {
        setTimeout(function(){
          replaceClass(receiver, 'is-visible', baseModifier);
        }, 500);
      }
    }, currentVideoDuration);
  };
}

function sceneIntro(introEl, introModifier, baseModifier, baseContent) {
  replaceClass(introEl, 'is-open', introModifier);
  if (baseModifier) {
    replaceClass(receiver, 'is-hidden', baseModifier);
  }

  video.onloadedmetadata = function() {
    currentVideoDuration = video.duration * 1000;
    setTimeout(function(){
      replaceClass(introEl, 'is-third', 'is-hiddening');
      replaceClass(receiver, 'is-two-thirds', 'is-visible');
      showContentSection(textSections, 'is-hiddening', 'is-hidden', baseContent);
      playNextVideo(playingScene);
      setTimeout(function(){
        replaceClass(introEl, 'is-hiddening', 'is-hidden');
      }, 1000);
    }, currentVideoDuration);
  };
}

function handleVideoSource(scene) {
  return function() {
    replaceVideoSource(scene);
  }
}

function playNextVideo(scene) {
  var nextScene = parseInt(scene.substring(5))+1,
      triger = document.querySelectorAll('[data-scene="scene'+nextScene+'"]');

  triger[0].click();
}

function replaceVideoSource(scene, handler) {
  var currentSceneSrc = videoSource[scene];

  if (i >= currentSceneSrc.sources.length) {
    i = 0;
  }
  i = (i == currentSceneSrc.sources.length) ? 0 : i;
  playVideo(scene, i);
  i++;

  if (currentSceneSrc.loop) {
    video.addEventListener('ended', handler, false);
  } else if (currentSceneSrc.outro) {
    video.addEventListener('ended', sceneOutro(currentSceneSrc.outro, 'is-open', 'is-hidden'), false);
  } else if (currentSceneSrc.shift) {
    // !!!! end here last time
    i++;
    video.addEventListener('ended', handler, false);
  } else {
    video.addEventListener('ended', function(){}, false);
  }
};


function init() {
  for (let i = 0; i < control.length; i++) {
    control[i].onclick = function(e) {
      e.preventDefault();
      playingScene = this.getAttribute("data-scene");

      var vidCurrentTime = Math.round(video.currentTime * 1000),
          newText = parseInt(playingScene.substring(5));

      video.removeEventListener('ended', sceneHandler, false);

      sceneHandler = handleVideoSource(playingScene);

      setTimeout(function() {
        replaceVideoSource(playingScene, sceneHandler);
        // check if scene has intro part, otherwise go ahead
        if (videoSource[playingScene].intro) {
          sceneIntro(videoSource[playingScene].intro, 'is-third', 'is-two-thirds', newText);
        } else {
          showContentSection(textSections, 'is-hiddening', 'is-hidden', newText);
        }
      }, currentVideoDuration - vidCurrentTime);
    }
  }

  showContentSection(textSections, 'is-hiddening', 'is-hidden', 1);
  replaceVideoSource(playingScene, sceneHandler);


  video.addEventListener('play', function() {
    var _this = this; //cache
    (function loop() {
      if (!_this.paused && !_this.ended) {
        ctx.drawImage(_this, 0, 0, receiver.offsetWidth, receiver.offsetHeight);
        setTimeout(loop, 1000 / 33); // drawing at 30fps
      }
    })();
  }, 0);

  // Remove Hero
  setTimeout(function(){
    addClass(hero, 'is-hidden')
  }, 300);
}

receiver.setAttribute('width', window.innerWidth);
receiver.setAttribute('height', window.innerWidth / 4 * 3);



/* -----------------
  end Plaing video to canvas 
  -----------------*/




