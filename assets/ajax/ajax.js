
$(document).ready(function () {
  showHeader();
  showFooter();
  showModal();

});



function showMyProfile() {
  $.ajax({
    url: "../Admin_project_shop/pro-profile.html",
    type: "GET",
    success: function (data) {

      $("#my-profile").html(data);
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


