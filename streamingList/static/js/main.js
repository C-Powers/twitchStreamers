var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "ESL_SC2", "OgamingSC2", "geeklyinc", "flosd"];


$("#add-channel").bind("keypress", {}, keypressInBox);
var channelTest = [];
function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var text = $(this).val();
    var newChannel = [];
    if (code == 13 && channels.indexOf(text) == -1) {
      newChannel.push(text)
      console.log("newChannel", newChannel)
      channelInfo(newChannel)
    }
};


//test channel
//var  channels = ["ESL_SC2"];

function channelInfo(channelsInput){
  channelsInput.forEach(
    function(channel){
      function apiURL(type, name){
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
      };
      $.getJSON(apiURL("streams", channel),
        function(data){
          var game, status, link;
          if(data.stream === undefined) {
            game = "Offline";
            status = "This account is closed";
          } else if (data.stream === null) {
            game = "Offline";
            status = "This account is currently offline";
          } else {
            game = data.stream.game;
            status = "Online";
          }
          //Tried to get the data.url api to work, but returned null for all channels. This is a quick
          //and easy fix, temporarily. As long as the channel doesn't change its name, we're good.
          link = "https://www.twitch.tv/" + channel;

          //  <!--an idea of the injected HTML-->
          //  <div class = "channelHolder" >
          //    <div class = "channel --channelName--" >
          //      --channelName--
          //    </div>
          //    <div class = "game --gameName--"
          //      --gameName--
          //    </div>
          //  </div>

          html = '<div class = "channel-holder channel-holder-' + channel
            + ' container"> <div class = "channel '
            + channel + '"> <a href = "' + link + '">' + channel
              + '</a> </div> <div class = "game">'
            + game + '</div> </div>';

          //$("#display").append(html);
          status == "Online" ?
            $("#display").prepend(html) : $("#display").append(html);

          $.getJSON(apiURL("channels", channel), function(data){
            var logo;
            logo = data.logo;
            if(logo == null){
              logo = 'https://pbs.twimg.com/profile_images/509073338191183872/fYdty6yd.png'
            }
            html = '<img class = "channel-logo" src=' + logo +  '> </div>';
            var jQtag = ".channel-holder-" + channel;
            //var jQtag = ".channel-holder"
            $(jQtag).prepend(html);
          });
        }
      );
    }
  );
}

window.onload = channelInfo(channels);
