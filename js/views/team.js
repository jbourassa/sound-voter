define(['jquery', 'backbone', 'underscore', 'views/feedback', 'text!templates/team.html'],
  function($, Backbone, _, Feedback, templateText) {
    var Team = Backbone.View.extend({
      tagName: 'li',

      events: {
        'click .start-record': 'startRecord',
        'click .delete' : 'destroy'
      },
      
      initialize: function() {
        _.bindAll(this);
        this.model.on('change', this.render);
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        return this.$el;
      },
      
      startRecord: function() {
        this.model.set('state', 'running');
        
        var feedback = new Feedback({
          model: this.model
        });
        
        feedback.render();
      },
      
      destroy: function(e) {
        e.preventDefault();
        this.trigger('team:destroyed', this.model);
        this.remove();
      },

      template: _.template(templateText)
    });
    
    return Team;
});

