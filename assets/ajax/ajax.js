
$(document).ready(function () {
  showHeader();
  showFooter();
  showModal();
  // showMainContent();
});



function showMainContent() {
  $.ajax({
    url: "/viewer/main_content",
    type: "GET",
    success: function (data) {
      $("#main-content").html(data);
    }
  });
}




function showHeader() {
  $.ajax({
    url: "/viewer/header.html",
    type: "GET",
    success: function (data) {
      $("#header").html(data);
    }
  });
}


function showFooter() {
  $.ajax({
    url: "/viewer/footer.html",
    type: "GET",
    success: function (data) {
      $("#footer").html(data);
    }
  });
}


function showModal() {
  $.ajax({
    url: "/viewer/modal.html",
    type: "GET",
    success: function (data) {
      $("#modal").html(data);
    }
  });
}


