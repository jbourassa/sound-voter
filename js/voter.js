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
        require(['views/teamlist', 'views/newteam',
                 'collections/teamcollection'],
          function(TeamList, NewTeam, TeamCollection) {
            var teamList = new TeamList({
              collection: new TeamCollection()
            });
            teamList.render().appendTo('body');
            
            var newTeam = new NewTeam();
            newTeam.render().appendTo('body');
            
            newTeam.on('team:added', teamList.teamAdded);
          });
      }
    });    
    
    return Voter;    
  });

