let start = 0;
let limit = 5;

function loadPosts(){

$.ajax({

url: "https://jsonplaceholder.typicode.com/posts",
method: "GET",

success: function(data){

let posts = data.slice(start, start + limit);

posts.forEach(function(post){

$("#postList").append(

`
<div class="post">
<div class="post-title">${post.title}</div>
<div class="post-body">${post.body}</div>
</div>
`

);

});

start += limit;

}

});

}

$(document).ready(function(){

loadPosts();

$("#loadMore").click(function(){

loadPosts();

});

});