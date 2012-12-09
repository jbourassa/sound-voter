define(['jquery', 'backbone', 'underscore', 'text!templates/newteam.html'],
  function($, Backbone, _, templateText) {
    
    var NewTeam = Backbone.Model.extend({
      tagName: 'form',
      initialize: function() {
        _.bindAll(this);      
      },
      
      render: function() {
        var html = this.template();
        $(this.el).html(html);
      }
      
      template: _.template(templateText)
    });
    
    return NewTeam;
});

