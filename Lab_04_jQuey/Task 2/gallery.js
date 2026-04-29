$(document).ready(function(){

let images=[
"https://picsum.photos/id/1015/500/300",
"https://picsum.photos/id/1016/500/300",
"https://picsum.photos/id/1018/500/300",
"https://picsum.photos/id/1020/500/300"
];

let captions=[
"Mountain View",
"Forest Road",
"Ocean Waves",
"Golden Bridge"
];

let index=0;

function showImage(){

$("#galleryImage").fadeOut(300,function(){

$(this)
.attr("src",images[index])
.fadeIn(300);

});

$("#caption").fadeOut(200,function(){

$(this)
.text(captions[index])
.fadeIn(200);

});

}

$("#next").click(function(){

index++;

if(index>=images.length){
index=0;
}

showImage();

});

$("#prev").click(function(){

index--;

if(index<0){
index=images.length-1;
}

showImage();

});

});