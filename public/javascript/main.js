//Check Off Specific Todos By Clicking

$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed')
})


//Clicking on X to delete Todo 
$('ul').on('click', 'span', function(event){
	//FOr destroy route
	$(document).ready(function(){
	   $('#delete-form').click(function(){
	     $(".destroy-button").submit();
	   });
	})
	$(this).parent().fadeOut(500, function(){
		$(this).remove()
	})
	event.stopPropagation();
});

$('input[type="text"').keypress(function(event){
	if(event.which === 13){
		//add todolist
		$(document).ready(function(){
	   	$('#add-form').keypress(function(){
	    $("#add-form").submit();
	   });
	})		
	}
})
if($("fa-plus")){
	$(".fa-plus").click(function(){
		$("#add-form").fadeToggle();
		$("input[type='text']").fadeToggle().focus();
		$(this).toggleClass("fa-plus").addClass("fa-minus");	
	})
} else {
	$(".fa-minus").click(function(){
		$("#add-form").fadeToggle();
		$("input[type='text']").fadeToggle();
		$(this).toggleClass("fa-minus").addClass("fa-plus");

	})
}
