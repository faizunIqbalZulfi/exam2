$(".scrollPage").on("click", function(event) {
  var tuju = $(this).attr("href");

  var elemenTuju = $(tuju);

  $("html, body").animate(
    {
      scrollTop: elemenTuju.offset().top
    },
    800
  );
  event.preventDefault();
});
