$(document).ready(function(){

$("#addBtn").click(function(){

let itemText = $("#itemInput").val();

if(itemText!=""){

$("#itemList").append(
"<li>"+itemText+" <button class='delete'>Delete</button></li>"
);

$("#itemInput").val("");

}

});

$("#itemList").on("click",".delete",function(){

$(this).parent().fadeOut(300,function(){
$(this).remove();
});

});

});