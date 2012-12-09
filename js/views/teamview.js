define(['zepto', 'backbone', 'underscore', 'text!templates/team.html'],
  function($, Backbone, _, templateText) {
    var TeamView = Backbone.Model.extend({
      tagName: 'div',
      initialize: function() {
        _.bindAll(this);      
      },
      
      render: function() {
        var html = this.template();
        $(this.el).html(html);
      }
      
      template: _.template(templateText)
    });
    
    return TeamView;
});

