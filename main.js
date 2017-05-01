function main() {

var currentSection = document.getElementById('genre');
var url = "https://api.nytimes.com/svc/topstories/v2/world.json";
var baseUrl = "https://api.nytimes.com/svc/topstories/v2/"
var newURL = "";
currentSection.addEventListener("change",setSection);

function Article(title, section, caption, url, imageURL, subsection){
  this.title = title,
  this.section = section,
  this.subsection = subsection,
  this.caption = caption,
  this.url = url,
  this.imageURL = imageURL;
};


var articles = new Array;
var sections = new Array;

function setSection(e){
  presentOverlay();
  document.getElementById('stories').innerHTML = '';
  articles = [];
  console.log(e.target.value);
   newURL = baseUrl;
   newURL += e.target.value +'.json';
   $.ajax({
     url: newURL,
     data: {'api-key': '1d6a654b48254f95b3ac83e7dbab29ca'},
     method: 'GET'
   }).done(function(data) {
     setTimeout(removeOverlay, 2000)
     changeHeader();
     $.each(data.results,function(index){
     var result = data['results'][index]
     var url = result.url;
     var section = result.section;
     var title = result.title;
     var caption = result.abstract;
     var imageURL = ""
     var subsection = result.subsection;
     console.log(result);
     console.log(result.multimedia);
     if(result.multimedia.length > 0){
      if(result.multimedia[4]){
     imageURL = result.multimedia[4].url;
     article = new Article(title, section, caption, url, imageURL, subsection);
     articles.push(article)};
   }


     console.log(articles);
     if(sections.includes(section)){

     } else{
         sections.push(section);
         console.log(sections);
     };
   });
     sections.sort();
   for(var i =0; i < 12; i++){
   createArticleSection(articles[i]);
   };
   }).fail(function(err) {
     throw err;
   });
}


function changeHeader(){
  document.getElementById('nav').classList.add('header-active');
  document.getElementById('logo').classList.add('logo-active');
  document.getElementById("form-container").classList.add("form-active");
};
function presentOverlay(){
 document.getElementById('stories').classList.add('hidden');
 document.getElementById('overlay').classList.add('appear');
//$('#overlay').show(2000, removeOverlay);
};

function removeOverlay() {
  document.getElementById('overlay').classList.remove('appear');
  document.getElementById('stories').classList.remove('hidden');
};

function createArticleSection(article){
    var container = document.getElementById('stories');
    var a = document.createElement('a');
    var div = document.createElement('div');
    var p = document.createElement('p');

    a.href = article.url;
    a.classList.add("full-width", "third-width", "quarter-width");
    div.style = 'background: '+'url('+ article.imageURL + ') center center no-repeat;background-size: cover;height: 100%; display: flex; align-items: flex-end;';
    p.style = 'background-color: rgba(0,0,0,0.3);';
    p.classList.add('white-font');
    p.innerHTML= article.caption;

    a.appendChild(div);
    div.appendChild(p);
    container.appendChild(a);
}

};
