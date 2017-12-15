(function($) {

  // make sure cookie is available
  if($.cookie){

       // localize all variables with _l_ to prevent any conflicts. better safe than sorry :)
       var _l_html = '<div class="hellobar-test">';

       // use json config obj.
       var _l_config = {
            "/":{
                 "redirectUrl":"/courses",
                 "timing":2000,
                 "copy":"Try our online course!",
                 "bar-css":'position:absolute;width:100%;max-width:500px;left:50%;top:50px;background-color:red;display:block;padding:10px 20px;transform:translateX(-50%);box-shadow:2px 2px 2px 2px rgba(0,0,0,.25)',
                 "link-css":"color:white;",
                 "close-css":'color:white;display:block;float:right;height:25px;cursor:pointer;'
            },
            "/packages/dplyr/versions/0.7.3":{
                 "redirectUrl":"/courses/dplyr-data-manipulation-r-tutorial",
                 "timing":3000,
                 "copy":"We even have courses on dplyr, try it today!",
                 "bar-css":'position:absolute;width:100%;max-width:500px;left:50%;top:50px;background-color:red;display:block;padding:10px 20px;transform:translateX(-50%);box-shadow:2px 2px 2px 2px rgba(0,0,0,.25)',
                 "link-css":"color:white;",
                 "close-css":'color:white;display:block;float:right;height:25px;cursor:pointer;'
            }
      }

      // grab the path
      var _l_p = window.location.pathname

      // we need to monitor the location and the cookie
      if(_l_config.hasOwnProperty(_l_p) && !$.cookie("top_banner_"+_l_p)){

           // reference to our config object
           var _l_obj = _l_config[_l_p];

           // build out link
           var _l_link = "https://www.datacamp.com"+_l_obj.redirectUrl;

           // complete our HTML
           _l_html += "<a href='#' class='hellobar_link'>"+_l_obj.copy+"</a><span class='hellobar_close'>X</span></div>"

           // Open the modal after the timing seconds
           setTimeout(function(){

                // create timestamp for time it opened
                var opened = new Date().getTime();

                // use pathname to allow multiple pop ups and tracking
                $.cookie("top_banner_"+_l_p, 'true', {expires:7})

                // track the time it took to open the modal
                ga('send', 'timing', 'variable-timing-growth-hellobar', 'time-to-open-ms', _l_obj.timing)

                // add the bar to the page
                $('body').append(_l_html);

                // add CSS to the bar
                $('.hellobar-test').attr('style', _l_obj['bar-css']);

                // style the link
                $('.hellobar_link').attr('style', _l_obj['link-css']);

                // style the close button
                $('.hellobar_close').attr('style', _l_obj['close-css']);

                // add click events to the bar and close button
                $('.hellobar_link').bind('click', function(e){

                     // time to click
                     var clicked = new Date().getTime();

                     // track the click event
                     ga('send', 'event', _l_p, 'click', 'Followed Courses Campaign');

                     // TODO: get the time it took to click
                     ga('send', 'timing', 'variable-timing-growth-hellobar', 'time-to-click-ms', (clicked-opened));

                     // redirect to link
                     window.location = _l_link;

                })

                // add click even to the close button
                $('.hellobar_close').bind('click', function(e){

                     // track time to close
                     var closed = new Date().getTime();

                     // track the close click
                     ga('send', 'event', _l_p, 'close', 'Closed Courses Campaign');

                     // track the time it took to close
                     ga('send', 'timing', 'variable-timing-growth-hellobar', 'time-to-close-ms', (closed-opened));

                     // remove the hellobar
                     $('.hellobar-test').remove();

                })

           }, _l_obj.timing);

      }
 }
})($jq);
