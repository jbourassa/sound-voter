define(['jquery', 'backbone', 'underscore', 'text!templates/feedback.html'],
  function($, Backbone, _, templateText) {
    var Feedback = Backbone.View.extend({
      tagName: 'div',
      className: 'modal hide',
      
      initialize: function() {
        _.bindAll(this);
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        this.$el.modal();
        
        this.chart = new Highcharts.Chart({
          chart: {
            renderTo: this.$el.find('.chart')[0],
            type: 'area',
            marginRight: 10
          },
          title: {
            text: '@TODO nom'
          },
          xAxis: {
            type: 'linear',
            min: 0,
            max: 10,
            tickPixelInterval: 150
          },
          yAxis: {
            title: {
              text: 'Noise'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          credits: false,
          series: [{
            data: []
          }]
        });
        
        return this.$el;
      },
      
      template: _.template(templateText)
    });
    
    return Feedback;
});

