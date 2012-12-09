define(['zepto', 'backbone', 'underscore', 'models/team'],
  function($, Backbone, _, Team) {
    var TeamCollection = Backbone.Collection.extend({
      model: Team
    });
    
    return TeamCollection;
  });
