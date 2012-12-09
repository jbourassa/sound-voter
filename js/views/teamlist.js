define(['zepto', 'backbone', 'underscore'],
  function($, Backbone, _) {
  
    var TeamList = Backbone.Model.extend({
      
      tagName: 'ul',
      
      initialize: function() {
        _.bindAll(this);      
      },
      
      render: function() {
        return this.$el;
      },
      
      teamAdded: function(team) {
        console.log(team.attributes);
      }
      
    });
    
    return TeamList;
});

