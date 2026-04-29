$(document).ready(function(){

$(".product-card button").click(function(){

alert("Item added to cart");

});

$(".shop-btn").click(function(){

$("html, body").animate({
scrollTop: $(".products-section").offset().top
}, 800);


});
});

});