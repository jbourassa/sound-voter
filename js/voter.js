define(['zepto', 'backbone', 'underscore', 'text!templates/team.html'],
  function($, Backbone, _, templateText) {    
    
    var Voter = Backbone.Router.extend({
      routes: {
        '': 'index'
      },
      
      initialize: function() {
        this.navigate();
      },
      
      index: function() {
        require(['views/teamlist', 'views/newteam'],
          function(TeamList, NewTeam) {
            var teamList = new TeamList();
            
            var newTeam = new NewTeam();
            newTeam.render().appendTo('body');
            
            newTeam.on('team:added', teamList.teamAdded);
          });
      }
    });    
    
    return Voter;    
  });

