$(function() {
  $(".eatBurger").on("click", function(event) {
    $.ajax(`/api/burger/${$(this).data("id")}`, {
      type: "PUT",
      data: {ate: $(this).data("state")}
    }).then(() => {
      console.log("Changed State");
      location.reload();
    })
  })

  $(".burgerDel").on("click", function(event) {
    $.ajax(`/api/burger/${$(this).data("id")}`, {
      type: "DELETE"
    }).then(() => {
      console.log("Deleted Record");
      location.reload();
    })
  })


  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      name: $("#theName").val().trim(),
      ate: $("[name=state]:checked").val().trim()
    }

    $.ajax("/api/burger/", {
      type: "POST",
      data: newBurger
    }).then(() => {
      location.reload(); 
    })
  })

})