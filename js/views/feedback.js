define(['jquery', 'backbone', 'underscore', 'text!templates/feedback.html'],
  function($, Backbone, _, templateText) {
    var Feedback = Backbone.View.extend({
      tagName: 'div',
      
      initialize: function() {
        _.bindAll(this);
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        return $(this.$el.html()).modal();
      },
      
      template: _.template(templateText)
    });
    
    return Feedback;
});

