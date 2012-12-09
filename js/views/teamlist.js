define(['jquery', 'backbone', 'underscore', 'views/team'],
  function($, Backbone, _, Team) {
  
    var TeamList = Backbone.View.extend({
      
      tagName: 'ul',
      
      initialize: function() {
        _.bindAll(this);
        this.collection.on('add', this.insertTeam);
      },
      
      render: function() {
        return this.$el;
      },
      
      teamAdded: function(team) {
        this.collection.add(team);
      },
      
      insertTeam: function(team) {
        var teamView = new Team({
          model: team
        });
        
        teamView.render(team.attributes).appendTo(this.el);
      }
    });
    
    return TeamList;
});

