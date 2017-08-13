
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
       	alert('failed' + e);      
       }

    });
});
});