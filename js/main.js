requirejs.config({
  paths: {
    zepto: '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min.js ',
    bootstrap: '//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min'
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
    }
  }
});

require(['zepto', 'underscore', 'backbone', 'app'], function($, _, Backbone, Voter) {
  window.voter = new Voter;
});
