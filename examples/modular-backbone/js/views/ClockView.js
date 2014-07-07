define([
  'underscore',
  'backbone',
  'models/ClockModel',
  'text!templates/appTemplate.html',
  'AppSync',
  'views/EditView'
  ], function(_, Backbone, ClockModel, appTemplate, AppSync, EditView){    

    console.log("background view called");

    var ClockView = Backbone.View.extend({

      el : "#clock",

      view : this,

      render : function() {
        $el = this.$el;

        var clockView = this;

        //update time now initially
        clockView.updateTime();

        //update time every minute starting when the next minute changes
        var now = new Date();
        var millisecondsLeft = (60 - now.getSeconds() + 1) * 1000 - now.getMilliseconds();
        clockView.updateTime();
        console.log("millisecondsLeft: ");
        console.log(millisecondsLeft);

        window.setTimeout(function(){
          clockView.updateTime();
          window.setInterval(function(){
            clockView.updateTime();
          }, 60000);
        }, millisecondsLeft  );
        

        return this;
      },

      updateTime : function(){
        console.log("updating time");
        var localTimeString = (new Date()).toLocaleTimeString();
        var secondOccuranceofColon = localTimeString.indexOf(":", 3);

        localTimeString = "" + localTimeString.slice(0, secondOccuranceofColon) + localTimeString.slice(secondOccuranceofColon+3);
        $el.text( localTimeString );

      }
        
    });

return ClockView;

}); 