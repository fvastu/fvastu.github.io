window.addEventListener('resize', function(){
  drawChart();  
});

function thisExists(id)
{
  if(document.getElementById(id)) return true;
  else return false;
}


function checkForAnExistingChart(containerID)
{
  var exists = thisExists("Chart");
  if (exists)
  {
    d3.select("#js-timelineChart").remove();
    d3.select(containerID).append("div").attr('id','js-timelineChart')
  }  
}

function drawChart() {
  checkForAnExistingChart("#timelineContainer");
  let timelineContainer = document.getElementById("timelineContainer")
  var dateOffset = 20;
  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var h = window.innerHeight || document.documentElement.clientHeigh || document.body.clientHeight;
  let scaleValue = 0.95;
  if (w < 500) scaleValue = 1.3; //problem in positioning on mobile
  if (w > 500 && w < 800) scaleValue = 1.2; //problem in positioning on medium screen
  if (w > 800 && w < 1100) scaleValue = 1.1; //problem in positioning on medium screen
  var graphicsWidth = 300;
  const xPosition = timelineContainer.clientWidth / scaleValue ;
  const svg = d3.select("#js-timelineChart").append("svg").attr('id','Chart').attr("height", h * 0.80).attr("width", w);
  d3.json("/assets/timelineData.json").then(function(data) {
    svg.append('line').attr('class', 'timeline-base').attr("x1", xPosition).attr("y1", 0).attr("x2", xPosition).attr("y2", '90%');
    // Get the value of the svg to for scaleLinear
    function getLineVal(val) {
      if(val === 'max') {
        let el = document.getElementById('Chart');
        return el.getBoundingClientRect().height;
      }
      else {
        return 0;
      }
    }
    // Convert to UNIX timestamp
    function convertToTimeStamp(date) {
      let parts = date.match(/(\d{4})-(\d{2})/);
      return new Date(parts[1]+ '-'+parts[2]+'-01').getTime();
    }

    //Create a map between the domain value and the range
    //1285891200000 is a sort of constant related to the ms elapsed from 1/01/1970, used as ref
    let scaleLine = d3.scaleLinear().domain([1285891200000, Date.now()]).range([getLineVal('min') - h/1.1, getLineVal('max')]);

    let scaleCircle = d3.scaleLinear()
                        .domain([moment.duration(3,'d').asMilliseconds(), moment.duration(10,'y').asMilliseconds()])
                        .range([h/40, h/5]);

    let allGroups = svg.selectAll('g').data(data);
    let group = allGroups.enter().append('g').attr('id', function(data){return 'group-' + data.id}).on('mouseenter', function(data) { OnMouseOver(data); });

    function GetRadius(data)
    {
      return scaleCircle(convertToTimeStamp(data.endDate) - convertToTimeStamp(data.startDate));
    }

    function GetCenterY(data)
    {
      return scaleLine(convertToTimeStamp(data.startDate))
    }

    function GetIllustration(data)
    {
      if (data.category == "Education") return "/assets/GraduationCapFontAwesome.svg";
      else return "/assets/LaptopCodeFontAwesome.svg"
    }

    function GetIconIntoCirclePosition(data)
    {
      let offsetY = 1.50;
      let offsetX = 1.50;
      return { x: (xPosition - GetRadius(data)/offsetX) ,y:(GetCenterY(data) - GetRadius(data)/offsetY) };
    }

    group.append('circle')
            .attr('cx', xPosition)
            .attr('cy', function(data) { return GetCenterY(data);})
            .attr('r', function(data) { return GetRadius(data);})
            .attr('fill-opacity', 0.5)
            .attr('class', function(data) { return('circle-category circle-' + data.category.toLowerCase())})
            .attr('id', function(data) { return 'circle-' + data.id });

            
    group.append("svg:image").attr("xlink:href", function(data) { return GetIllustration(data) })
                             .attr('x', function(data) { return GetIconIntoCirclePosition(data).x })
                             .attr('y', function(data) { return GetIconIntoCirclePosition(data).y })
                             .attr('height', function(data) { return 1.35 * GetRadius(data)})
                             .attr('width', function(data) { return 1.35 * GetRadius(data)})
                             .attr('opacity',0.75);
    
    group.append('text').style('opacity', 0).text(function(data) { return(data.name);}).attr('y', function(data) {
        let elementHeight= this.getBoundingClientRect().Height;
        // Avoid overflow
        if(scaleLine(convertToTimeStamp(data.startDate)) + elementHeight >= getLineVal('max')) {
          return scaleLine(convertToTimeStamp(data.startDate)) - elementHeight;
        }
        else return scaleLine(convertToTimeStamp(data.startDate));
      }).attr('x', graphicsWidth/5).attr('class', 'text-position');

    group.append('text').text(function(data) {
      // Get only YYYY-MM
      if(data.startDate.length > 7) {
        return (data.startDate.slice(0,7))
      }
      else return(data.startDate)
    }).attr('y', function(data) {
      // Get sibling to have the len and align the date
      let elementHeight= this.getBoundingClientRect().Height;
      let positionHeight = this.parentNode.querySelector('text.text-position').getBoundingClientRect().height;
      if(scaleLine(convertToTimeStamp(data.startDate)) + positionHeight >= getLineVal('max')) {
        return scaleLine(convertToTimeStamp(data.startDate)) - elementHeight;
      }
      else return scaleLine(convertToTimeStamp(data.startDate)) - dateOffset; //subtract an offset vertically of 20
    }).attr('x', 0).attr('class', 'text-date').style('opacity', 0);
  });
  
}

function OnMouseOver(data)
{
  StopAnimation();
  console.log('confetti triggered');
  let cardId = 'checkpoint';
  //var self = d3.select('#circle-' + data.id);
  //var clickPosition = { x: self.attr('cx'), y: self.attr('cy')};
  var cardData = { Title: data.name, Place: data.placeName, Date: 'from ' + data.startDate + " to " + data.endDate, Description: data.description, ID: data.id, IsDegree: data.category == "Education" ? true : false };
  var card =  CreateCard(cardData,cardId);
  //SetCardPosition(card,clickPosition);
  SetCardPositionIntoTheMiddle(card);
  AppendChildTo(card,'timelineContainer');
  AnchorCloseButtonPosition();
  AddListeners();
  ThrowConfetti(GetConfettiStartPosition(cardId, 'js-close-card'), true);
}

let lastX = 0;
var confettiThrown = false;

function r(mi, ma) {
    return parseInt(Math.random() * (ma - mi) + mi);
}

//This function uses a timer to avoid firing too many animation
//after 2 seconds confetti will disappear, so you can start another animation
const ThrowConfetti = (evt, highNumber) => {
    const direction = Math.sign(lastX - evt.x);
    lastX = evt.x;
    const particleCount = highNumber ? r(122, 245) : r(2, 15);
    setTimeout(WaitForConfettiFall, 2000); 
    if (!confettiThrown)
      {
        confetti({
          particleCount,
          angle: r(45, 90),
          spread: r(45, 45),
          resize : true,
          origin: { x: (evt.x) / window.innerWidth, y: (evt.y) / window.innerHeight }
        });
        confettiThrown = true;
    }
};

function WaitForConfettiFall()
{
  confettiThrown = false;
}

//This function clears the content of the card container
function ResetCard(canvasContainer)
{
    deleteChild(canvasContainer);
    addCanvasBack(canvasContainer);
}

//Given a node deletes the content
function deleteChild(element) { 
    //e.firstElementChild can be used. 
    var child = element.lastElementChild;  
    while (child) { 
        element.removeChild(child); 
        child = element.lastElementChild; 
    } 
} 

function GetConfettiStartPosition(cardId, closeId)
{
  let size = GetElementSizeById(cardId);
  let closePos = GetElementPosition(closeId);
  return {x: closePos.x - size.x, y:closePos.y};
}

function GetElementSize(element)
{
  var size = {x: element.clientWidth, y: element.clientHeight};
  return size;
}

function GetElementSizeById(id)
{
  let cardContainerId = document.getElementById(id);
  var size = {x: cardContainerId.clientWidth, y: cardContainerId.clientHeight};
  return size;
}

function GetElementPosition(id)
{  
  var elem = document.getElementById(id);
  var rect = elem.getBoundingClientRect();
  return {x:rect.left,y:rect.top};
}

function addCanvasBack(element)
{
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id','drawingCanvas');
    element.appendChild(canvas);
}

function SetCardPositionIntoTheMiddle(card)
{
  let cardContainerId = 'checkpoint';
  Reset(cardContainerId);
  let vw = $(window).width()/100;
  if (vw * 100 > 992) card.attr('style','position:absolute; top: 25%; left: 0;');
  if (vw * 100 > 768 && vw * 100 < 992) card.attr('style','position:absolute; top: 25%; left: 25%;');
  else card.attr('style','position:absolute; top: 15%; left: 15%;');
}


function Reset(id)
{
  if (thisExists(id)) document.getElementById(id).remove();
}

function AppendChildTo(cardContainer,id)
{    
    var timelineContainer = document.getElementById(id); 
    timelineContainer.appendChild(cardContainer.node());
}

function CreateOldCard(cardValue,cardContainerId)
{
    var cardContainer = d3.create('div');
    cardContainer.attr('id',cardContainerId).attr('class','card-container');
    cardContainer.append('a').attr('id','js-close-card').attr('href','#').attr('class','close horizontal-center').html('X');
    var card = d3.create('div').attr('id','js-card').attr('class','card');
    if (cardValue.IsDegree)
    {
      card.append('div').attr('class','card__image-container').append('img').attr('class','card__image').attr('src','https://freepngimg.com/thumb/education/59137-ceremony-and-certificate-degree-cap-graduation-bachelor.png')
    }
    else
    {
      card.append('div').attr('class','card__image-container').append('img').attr('class','card__image').attr('src','/assets/Programmer.png')
    }
    var svg = d3.create('svg').attr('class', 'card__svg').attr('viewBox','0 0 800 500');
    svg.append('path').attr('d',"M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500").attr('stroke', 'transparent').attr('fill','transparent');
    svg.append('path').attr('d',"M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400").attr('class','card__line').attr('stroke', 'transparent').attr('fill','transparent');
    var cardContent = d3.create('div').attr('class', 'card__content');
    var title = d3.create('h1').attr('class', 'card__title').html(cardValue.Title);
    var place = d3.create('h1').attr('class', 'card__place').html(cardValue.Place);
    var description = d3.create('p').attr('class','card__text').html(cardValue.Description);
    cardContent.append(() => title.node());
    cardContent.append(() => place.node());
    cardContent.append(() => description.node());
    card.append(() => svg.node());
    card.append(() => cardContent.node());
    cardContainer.append(() => card.node());
    return cardContainer;
}

function CreateCard(cardValue,cardContainerId)
{
  var cardContainer = d3.create('div');
  cardContainer.attr('id',cardContainerId).attr('class','card__container');
  cardContainer.append('div').attr('id','js-close-card').attr('class','close horizontal-center').html('X');
  var academicHat = d3.create('img').attr('src','/assets/AcademicHat.svg').attr('class','education-illustration');
  var codingComputer = d3.create('img').attr('src','/assets/ComputerCoding.svg').attr('class','work-illustration');
  var card = d3.create('div').attr('class', 'card');
  var cardTextContainer = d3.create('div').attr('class','card__text__container');
  var background = d3.create('img').attr('src','/assets/EducationSketch.svg');
  var title = d3.create('h1').attr('class', 'card__title').html(cardValue.Title);
  var locationContainer = d3.create('div');
  var locationIcon = d3.create('img').attr('src','/assets/location.png');
  var locationText = d3.create('p').html(cardValue.Place);
  var dateContainer = d3.create('div');
  var dateIcon = d3.create('img').attr('src','/assets/calendar.png');
  var dateText = d3.create('p').html(cardValue.Date);
  var separator = d3.create('div').attr('class','separator');
  var description = d3.create('p').html(cardValue.Description);
  cardTextContainer.append(() => title.node());
  locationContainer.append(() => locationIcon.node());
  locationContainer.append(() => locationText.node());
  cardTextContainer.append(() => locationContainer.node());
  dateContainer.append(() => dateIcon.node());
  dateContainer.append(() => dateText.node());
  cardTextContainer.append(() => dateContainer.node());
  cardTextContainer.append(() => separator.node());
  cardTextContainer.append(() => description.node());
  card.append(() => background.node());
  card.append(() => cardTextContainer.node());
  if (cardValue.IsDegree == true) cardContainer.append(() => academicHat.node());
  else cardContainer.append(() => codingComputer.node());
  cardContainer.append(() => card.node());
  return cardContainer;
}

function AddListeners()
{
    //Remove the card when click on the X
    $("#js-close-card").click(function(){
        var close = $(".card__container");
        close.remove();    
    })

}

function AnchorCloseButtonPosition()
{
  d3.select("#js-close-card").attr('style','position:relative; top:' + -16 + 'px; left:' + -16 + 'px;');
}

//Check for the existence of a card, if a card exists returns true
function CardExist()
{
    var card = $("#js-card")[0];
    if (card == undefined) return false;
    return true;
}

