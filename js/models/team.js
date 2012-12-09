define(['zepto', 'backbone', 'underscore'],
  function($, Backbone, _) {
    var Team = Backbone.Model.extend({
      defaults: {
        name: '',
        state: 'new'
      }
      
    });
    
    return Team;
  });
