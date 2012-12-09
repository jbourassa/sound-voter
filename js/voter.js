define(['zepto', 'backbone', 'underscore', 'text!templates/team.html'],
  function($, Backbone, _, templateText) {    
    console.log($, Backbone, _, templateText);
    var Voter = Backbone.Router.extend({
      routes: {
        '': 'index'
      },
      
      initialize: function() {
        this.navigate();
      },
      
      index: function() {
        require(['views/newteam', 'models/team'], function(NewTeam, Team) {
          var newTeam = new NewTeam({
            model: new Team()
          });
          newTeam.render();
        });
      }
    });    
    
    return Voter;    
  });

