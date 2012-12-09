define(['zepto', 'backbone', 'underscore', 'text!templates/team.html'],
  function($, Backbone, _, templateText) {
    var TeamView = Backbone.View.extend({
      tagName: 'li',
      
      initialize: function() {
        _.bindAll(this);
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        return this.$el;
      },
      
      template: _.template(templateText)
    });
    
    return TeamView;
});

