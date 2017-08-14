
$( document ).ready(function() {
$('#blogsubmit').on('submit', function(e){
    e.preventDefault();
    $.ajax({
       type: "POST",
       url: "http://localhost:3000/blogs",
       data: $(this).serialize(),
       success: function() {
         console.log('success');
       },
       error: function(e){
       	console.log('failed' + e);      
       }

    });
});

$('#updateblog').on('submit', function(e){
    e.preventDefault();
    $.ajax({
       type: "PUT",
       url: "http://localhost:3000/blogs",
       data: JSON.stringify(this),
       success: function() {
         console.log('success');
       },
       error: function(e){
        alert('failed' + e);      
       }

    });
});

// $('#deletepost').on('submit', function(e){
//     e.preventDefault();
//     $.ajax({
//        type: "DELETE",
//        url: "http://localhost:3000/blogs",
//        data: $(this).serialize(),
//        success: function() {
//          console.log('success');
//        },
//        error: function(e){
//         alert('failed' + e);      
//        }

//     });
// });


});