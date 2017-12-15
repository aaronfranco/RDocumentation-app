(function($) {
  // make sure cookie is available
  if($.cookie){
       // localize all variables with _l_ to prevent any conflicts. better safe than sorry :)
       var _l_html = '<div class="hellobar-test">';
       var _l_config = {
            "/":{
                 "redirectUrl":"/courses",
                 "timing":2000,
                 "copy":"Try our online course!"
            },
            "/packages/dplyr/versions/0.7.3":{
                 "redirectUrl":"/courses/dplyr-data-manipulation-r-tutorial",
                 "timing":3000,
                 "copy":"We even have courses on dplyr, try it today!"
            }
      }
      // grab the path
      var _l_p = window.location.pathname
      // we need to monitor the location and the cookie
      if(_l_config.hasOwnProperty(_l_p) && !$.cookie("top_banner_"+_l_p)){
           // reference to our config object
           var _l_obj = _l_config[_l_p];
           var _l_link = "https://www.datacamp.com"+_l_obj.redirectUrl;
           _l_html += "<a href='#' class='hellobar_link'>"+_l_obj.copy+"</a><span class='hellobar_close'>X</span></div>"
           // Open the modal after the timing seconds
           setTimeout(function(){
                // TODO: set the cookie for 1 week
                // use pathname to allow multiple pop ups and tracking
                // $.cookie("top_banner_"+_l_p, 'true', {expires:7})

                // TODO: add tracking for timing here
                //

                // add the bar to the page
                $('body').append(_l_html);

                // TODO: Move CSS to Configuration object
                // add CSS to the bar
                $('.hellobar-test').css('position', "absolute")
                $('.hellobar-test').css('width', "100%")
                $('.hellobar-test').css('max-width', "500px")
                $('.hellobar-test').css('left', "50%")
                $('.hellobar-test').css('top', "50px")
                $('.hellobar-test').css('background-color', "red");
                $('.hellobar-test').css('display', "block");
                $('.hellobar-test').css('padding', "10px 20px");
                $('.hellobar-test').css('transform', "translateX(-50%)");
                $('.hellobar-test').css('box-shadow', "2px 2px 2px 2px rgba(0,0,0,.25)");

                // style the link
                $('.hellobar_link').css('color', "white");
                // style the close button
                 $('.hellobar_close').css('color', "white");
                 $('.hellobar_close').css('display', "block");
                 $('.hellobar_close').css('float', "right");
                 $('.hellobar_close').css('width', "25px");
                 $('.hellobar_close').css('height', "25px");
                 $('.hellobar_close').css('cursor', "pointer");

                // add click events to the bar and close button
                $('.hellobar_link').bind('click', function(e){
                     // TODO: add tracking & timing code here
                     window.location = _l_link;
                })
                $('.hellobar_close').bind('click', function(e){
                     // TODO: add tracking & timing code here
                     $('.hellobar-test').remove();
                })

           }, _l_obj.timing);
           // todo: add tracking code
           // todo: add timing code
      }
 }
})($jq);
