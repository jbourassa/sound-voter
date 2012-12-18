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
        this.$el.find('.modal-body').focus();
        this.initChart();
        this.initRecorder();
        
        return this.$el;
      },
      
      template: _.template(templateText),

      notify: function(y) {
        $.fx.off = true;
        y = parseFloat(y.toFixed(2));
        this.chart.series[0].addPoint([(this.current++ * this.interval) / 1000, y], true, false);
        $.fx.off = false;
      },

      finished: function(score) {
        this.model.set({
          score: score,
          state: 'done'
        });
        this.chart.setTitle({
          text: this.model.get('name') + ' - <strong>' + score.toFixed(2) + '</strong>'
        });
        this.chart.redraw();
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
          title: {
            text: this.model.get('name'),
            margin: 24,
            style: {
              fontSize: '26px',
              margin: '10px 0'
            }
          },
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
              text: 'Noise',
              style: {
                fontSize: '16px'
              }
            }
          },
          legend: { enabled: false },
          exporting: { enabled: false },
          credits: false,
          plotOptions: {
            series: {
              lineWidth: 4,
              color: '#3D03ED'
            }
          },
          series: [{ data: [] }]
        });
      }
    });
    
    return Feedback;
});

