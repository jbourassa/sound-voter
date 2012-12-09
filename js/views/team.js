define(['jquery', 'backbone', 'underscore', 'views/feedback', 'text!templates/team.html'],
  function($, Backbone, _, Feedback, templateText) {
    var Team = Backbone.View.extend({
      tagName: 'li',
      
      events: {
        'click .start-record': 'startRecord'
      },
      
      initialize: function() {
        _.bindAll(this);
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        return this.$el;
      },
      
      startRecord: function() {
        var feedback = new Feedback({
          model: this.model
        });
        
        feedback.render();
      },      
      
      template: _.template(templateText)
    });
    
    return Team;
});

