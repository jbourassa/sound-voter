requirejs.config({
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
    bootstrap: '//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
    highcharts: '//code.highcharts.com/highcharts',
    recorder: '/js/vendor/recorder',
    sampler: '/js/sampler'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['underscore', 'jquery']
    },
    bootstrap: ['jquery'],
    highcharts: [],
    recorder: [],
    sampler: ['recorder']
  }
});

require(['jquery', 'underscore', 'backbone', 'bootstrap', 'highcharts',
         'recorder', 'sampler', 'voter'],
  function($, _, Backbone, Bootstrap, HighCharts, Recorder, Sampler, Voter) {
    window.voter = new Voter();
    
    Backbone.history.start({
      pushState: true
    });
});
