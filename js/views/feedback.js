define(['jquery', 'backbone', 'underscore', 'text!templates/feedback.html'],
  function($, Backbone, _, templateText) {
    var Feedback = Backbone.View.extend({
      tagName: 'div',
      className: 'modal hide',
      
      interval: 250,

      duration: 5000,

      initialize: function() {
        _.bindAll(this);
        this.current = 0;
      },
      
      render: function() {
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        this.$el.modal();
        this.initChart();
        this.initRecorder();
        
        return this.$el;
      },
      
      template: _.template(templateText),

      notify: function(y) {
        $.fx.off = true;
        this.chart.series[0].addPoint([(this.current++ * this.interval) / 1000, y], true, false);
        $.fx.off = false;
      },

      finished: function() {
        // @TODO : finish it up.
      },

      initRecorder: function() {
        this.sampler = new Sampler({
          notify: this.notify,
          end: this.finished,
          duration: this.duration,
          interval: this.interval
        });

        this.sampler.run(window.voter.source);
      },

      initChart: function() {
        this.chart = new Highcharts.Chart({
          chart: {
            renderTo: this.$el.find('.chart')[0],
            type: 'line',
            marginRight: 10
          },
          title: { text: '@TODO nom' },
          xAxis: {
            type: 'linear',
            min: 0,
            max: (this.duration / this.interval - 2) * this.interval / 1000,
            tickPixelInterval: 150,
            labels: false,
            lineWidth: 0,
            tickWidth: 0
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Noise'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: { enabled: false },
          exporting: { enabled: false },
          credits: false,
          plotOptions: {
            series: { animation: false }
          },
          series: [{ data: [] }]
        });
      }
    });
    
    return Feedback;
});

