define(['jquery', 'backbone', 'underscore', 'text!templates/team.html'],
  function($, Backbone, _, templateText) {    
    
    var Voter = Backbone.Router.extend({
      routes: {
        '': 'index'
      },
      
      initialize: function() {
        _.bindAll(this);
        this.authorize();
      },
      
      index: function() {
        require(['views/teamlist', 'views/newteam',
                 'collections/teamcollection'],
          function(TeamList, NewTeam, TeamCollection) {
            var teamList = new TeamList({
              collection: new TeamCollection()
            });
            teamList.render().appendTo('.container');
            
            var newTeam = new NewTeam();
            newTeam.render().appendTo('.container');
            
            newTeam.on('team:added', teamList.teamAdded);
          });
      },

      authorize: function() {
        navigator.webkitGetUserMedia({ audio: true }, this.mediaSuccess, this.mediaError);
      },
      
      mediaSuccess: function(stream) {
        var context = new webkitAudioContext();
        this.source = context.createMediaStreamSource(stream);
        this.navigate();
      },

      mediaError: function(e) {
        alert('Not supported on your shitty browser.');
        console.error(e);
      }
    });
    
    return Voter;
  });

