/*
====================THIS FILE INCLUDES:=====================
- Fade animation for the personal image
- Listener for website loaded event 
- Show Scroll Down container 
- Show NavigationBar used for vertical one page scroll
- Start and stop matrix wall effect
- Animation Effects for skills section
- Delay Helper
- Carousel Rendering Function
- Keydown function used for carousel
- Function Manager used to refresh the carousel at given 
  time in order to make carousel responsive
- Function to start the message typed in contacs message (only when needed)
- Function to start preloader animation
- Function to start the cursor effect used in the about me page
- Function to stop the cursor effect used in the about me page
===========================================================
*/


console.log('main.js Loaded');

const delayMatrixEffect = 500;

/* Fade in animation on startup*/
$(document).ready(function(){
    $("#personal-image").hide().slideDown(700, 'linear').css('opacity', 0).animate({opacity: 1}, {queue: false, duration: 700});
  });

  $(document).ready(function() {
    $('div.icon-bar a').on( 'click', changeActiveNavigationItem);
  });

window.addEventListener('resize', FunctionManager(function (event) {
    CarouselFactory();
  },500));

  $(window).on('load', function() { // makes sure the whole site is loaded 
    console.log('load fired');
    $('.preloader-container').fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $("#js-main-container").css("visibility","visible");
    GetTypedWriterHomePage();
  })

  function changeActiveNavigationItem()
  {
    var currentActive = $(this).parent().find( 'a.current-item' );
    var href = currentActive.attr('href');
    window.location.href = href;
    currentActive.removeClass( 'current-item' );
    $(this).addClass( 'current-item' );
  }

  function GetTypedWriterHomePage(){
    return new Typed(".window-input ", {
      strings: ['<span>run hackFBI.exe</span>'],
      typeSpeed:60, //bigger is slower
      startDelay: 0,
      backSpeed: 0,
      smartBackspace: true,
      shuffle: false,
      backDelay: 50,
      loop: false,
      cursorChar: '_',
      contentType: 'html',
      startDelay: 0,
      onComplete: (self) => {
        var doneTextContainer = document.getElementById("js-done-text-container");
        doneTextContainer.style.visibility = "visible";
        setTimeout(function() {
          var console = document.getElementById("js-window");
          console.remove();
          StartMatrixEffect();
        }, 500);
        setTimeout(function() {
          var matrixWall = document.getElementById("matrix-wall");
          matrixWall.remove();
        }, 3500);
        setTimeout(function() {
          //use this line to stop and hide the cursor. In this way this will not overlap with the other typewriter 
          self.stop();
          self.cursorChar = ''
        }, 4500);
      },
    }); 
  }

function RenderWebsiteAfterIntro()
{
  ContentScrollable(); //enable the scrollbar disabled during the animation
  ShowScrollDownContainer();
  ShowVerticalNavigationBar();
  ShowTitles();
}

function ShowTitles()
{
  var titles = document.getElementsByClassName("title-wrapper");
  Array.from(titles).forEach(function(title) 
  {
    title.style.visibility = "visible";
    title.style.marginTop="20px";
  });
}

function ContentScrollable()
{
  var mainDiv = document.getElementById("js-main-container");
  mainDiv.classList.add("fill-height");
}

function ShowVerticalNavigationBar()
{
  var verticalNavBar = document.getElementById("js-vertical-nav-container");
  var horizontalNavBar = document.getElementById("js-horizontal-nav-container");
  verticalNavBar.style.visibility = "visible";
  horizontalNavBar.style.visibility = "visible";
}

function ShowScrollDownContainer()
{
  var moreAboutMeButton = document.getElementById("scroll-down-container");
  moreAboutMeButton.style.opacity = 1;
  moreAboutMeButton.style.visibility = "visible";
}

function changeActiveNavigationItemOnScroll(indexActiveElement)
{
  var navigationItemsCollection = document.querySelectorAll("#js-vertical-nav-container > a");
  for (var i = 0; i < navigationItemsCollection.length; i++) {
    navigationItemsCollection[i].classList.remove("current-item");
  }
  navigationItemsCollection[indexActiveElement].classList.add("current-item");
  console.log('Item now active =>',indexActiveElement);
}

function ShowDoneText()
{
  var textElement = document.getElementById("animation-complete-text");
  textElement.style.opacity = 1;
}

function StopMatrixEffect()
{  
  var typeWritingContainer = document.getElementById("js-type-writing-container");
  typeWritingContainer.style.opacity = 1;
  var matrixWall = document.getElementById("matrix-wall");
  matrixWall.remove();
  var firstRowText = document.getElementById('first-row-text-content');
  firstRowText.remove();
  var secondRowText = document.getElementById("second-row-text");
  secondRowText.remove();
}

function ShowMatrixWall()
{
  var matrixWall = document.getElementById("matrix-wall");
  matrixWall.style.visibility = "visible";
}

function StartMatrixEffect()
{
  var c = document.getElementById("matrix-wall");
  //var typeWritingContainer = document.getElementById("js-type-writing-container");
  //typeWritingContainer.style.opacity = 0;
  var ctx = c.getContext("2d");
  
  //making the canvas full screen
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  
  //chinese characters - taken from the unicode charset
  var chars = "123456789sddsf%%&$£&(";
  //converting the string into an array of single characters
  chars = chars.split("");
  
  var font_size = 10;
  var columns = c.width/font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for(var x = 0; x < columns; x++)
    drops[x] = 1; 
  
  //drawing the characters
  function draw()
  {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
      //a random char to print
      var text = chars[Math.floor(Math.random()*chars.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i*font_size, drops[i]*font_size);
      
      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if(drops[i]*font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;
      
      //incrementing Y coordinate
      drops[i]++;
    }
  }
  setInterval(draw, 20);
}

function AboutMeContentAnimation() {
  var timelineImage = gsap.timeline();
  timelineImage.from("img", 1, {opacity: 0, x: -1000, });
  var timelineTitle = gsap.timeline();
  timelineTitle.from("#js-title",1, {opacity: 0, x: -window.innerWidth/4 });
  var timelineDescription = gsap.timeline();
  timelineDescription.from("#js-description",1, {opacity: 0, y: window.innerWidth/4 });
  var backgroundText = gsap.timeline();
  backgroundText.from("#js-background-text", 1, {opacity: 0, x:outerWidth * 1.15  });
  var chart = gsap.timeline();
  chart.from("#js-timelineChart", 1, {opacity: 0, y: -window.innerWidth/2 });
}

function RemoveExistingCard()
{
  var exists = thisExists("checkpoint");
  if (exists) document.getElementById("checkpoint").remove();
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
      setTimeout(() => {
          done();
      }, n);
  });
}

function OnCarouselRendering( carousel ) {
  value.text( getSkillsValue(carousel.nearestItem().element));
  title.text( carousel.nearestItem().element.alt )
  // Fade in based on proximity of the item
  var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
  title.css('opacity', 0.5 + (0.5 * c))
}

function getSkillsValue(element) {
  return element.dataset.skillRating;
}

$(document).keydown( function( e ) {
  switch( e.keyCode ) {
    /* left arrow */
    case 37:
      $('.left').click()
      break
    /* right arrow */
    case 39:
      $('.right').click()
  }
} )


function FunctionManager(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function StartContactMessage(options)
{
  if (thisExists("js-contacts-text")) 
  {  
    var contactText = document.getElementById("js-contacts-text");
    contactText.remove();
    var messageText = document.createElement("div");
    messageText.className = "box text";
    messageText.setAttribute("id","js-contacts-text")
    var parentMessageText = document.getElementsByClassName("parent")[0];
    parentMessageText.appendChild(messageText);
  }
  new Typed('#js-contacts-text',options);
}

function StartCursorAnimation()
{      
  let vw = $(window).width()/100;
  if (vw * 100 > 992) handCursorMove.fromTo("#js-hand-cursor", 1.5, {x: 0*vw}, { repeat: 3, opacity:1, x: 10*vw, onComplete: StopAnimation });
  if (vw * 100 > 768 && vw * 100 < 992 ) handCursorMove.fromTo("#js-hand-cursor", 1.5, {x: 25*vw}, { repeat: 3, opacity:1, x: 50*vw, onComplete: StopAnimation });
  else handCursorMove.fromTo("#js-hand-cursor", 1.5, {x: 10*vw }, { repeat: 3, opacity:1, x: 40*vw, onComplete: StopAnimation });
}

function StopAnimation()
{
  handCursorMove.kill();
  let cursorWrapper = document.getElementById("js-hand-cursor-wrapper");
  cursorWrapper.style.display = "none";
}

