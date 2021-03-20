// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  $(".consume").on("click", (event) => {
    let id = $(this).data("id");
    let newConsume = $(this).data("newconsume");
    console.log(`testing ${id} * ${newConsume}`);
    let newConsumeState = {
      consume: true,
    };

    // Send the PUT request.
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: newConsumeState,
    }).then(() => {
      console.log("changed consume to", newConsume);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", (event) => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newBurger = {
      burger: $("#burger").val().trim(),
      // consume: $("[burger=consume]:checked").val()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      console.log("created new Burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click",  (event) => {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax(`/api/burgers/${id}`, {
      type: "DELETE",
    }).then( () => {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
