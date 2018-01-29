$("input[name='search']").keypress(function(e){
  if(e.keyCode == 13){
    result = ajaxQuery(type='get', apiURL='/search/particle/'+$("input[name='search']").val());
    console.log($("input[name='search']").val());
    console.log(result);
  }
});
