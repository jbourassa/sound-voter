define(['zepto', 'backbone', 'underscore', 'text!templates/newteam.html'],
  function($, Backbone, _, templateText) {
    
    var NewTeam = Backbone.View.extend({
      tagName: 'form',
      initialize: function() {
        _.bindAll(this);      
      },
      
      render: function() {
        var html = this.template();
        $(this.el).html(html);
        console.log('là');
        return this.$el;
      },
      
      template: _.template(templateText)
    });
    
    return NewTeam;
});

