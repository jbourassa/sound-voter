define(['jquery', 'backbone', 'underscore', 'models/team', 'text!templates/newteam.html'],
  function($, Backbone, _, Team, templateText) {
    
    var NewTeam = Backbone.View.extend({
      tagName: 'div',
      
      events: {
        'submit': 'submitted'
      },
      
      initialize: function() {
        _.bindAll(this);    
      },
      
      render: function() {
        var html = this.template();
        this.$el.html(html);
        return this.$el;
      },
      
      submitted: function(ev) {
        ev.preventDefault();
        var $teamName = this.$el.find('#new-team-name');
        var team = new Team({
          name: $teamName.val()
        });
        this.trigger('team:added', team);
        $teamName.val('');
      },
      
      template: _.template(templateText)
    });
    
    return NewTeam;
});

