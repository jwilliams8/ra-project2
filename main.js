function main() {

var currentSection = document.getElementById('genre');
var url = "https://api.nytimes.com/svc/topstories/v2/world.json";
var baseUrl = "https://api.nytimes.com/svc/topstories/v2/"
var newURL = "";
currentSection.addEventListener("change",setSection);


function setSection(e){
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


function createArticleSection(article){
    var container = document.getElementById('stories');
    var a = document.createElement('a');
    var div = document.createElement('div');
    var p = document.createElement('p');

    a.href = article.url;
    a.style = 'width: 25%;'
    div.style = 'background: '+'url('+ article.imageURL + ') center center no-repeat;background-size: cover;height: 275px; display: flex; align-items: flex-end;';
    p.style = 'background-color: rgba(0,0,0,0.3); color: white;';
    p.innerHTML= article.caption;
    a.appendChild(div);
    div.appendChild(p);
    container.appendChild(a);
}

};
