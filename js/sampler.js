
function Sampler(opts) {
  if(!opts) opts = {};
  var d = Sampler.default_opts;
  this.opts = {};
  this.opts.delay = opts.delay || d.delay;
  this.opts.interval = opts.interval || d.interval;
  this.opts.notify = opts.notify || d.notify;
  this.opts.end = opts.end || d.end;

  this._next_start = 0;
  this._rec = null;
  this._interval_id = null;
};

Sampler.default_opts = {
  delay: 10000,
  interval: 1000,
  notify: function() {},
  end: function() {},
};

Sampler.prototype = {
  run: function() {
    this._rec = new Recorder(source, { workerPath: '/js/vendor/recorderWorker.js' });
    this._rec.record();
    this._interval_id = setInterval(this._report.bind(this), this.opts.interval);
    setTimeout(this._end.bind(this), this.opts.delay);
  },

  _report: function() {
    this._rec.getBuffer(function(buffers) {
      var sample = Sample.from_stereo(buffers[0], buffers[1], this._next_start);
      this._next_start = buffers[0].length - 1;
      this.opts.notify(sample.rms());
    }.bind(this));
  },

  _end: function() {
    clearInterval(this._interval_id);
    this._rec.getBuffer(function(buffers) {
      this._rec.clear();
      var sample = Sample.from_stereo(buffers[0], buffers[1]);
      this.opts.end(sample.rms());
    }.bind(this));
  },
};

function Sample(buffer, t0) {
  this._buffer = buffer;
  this._mean = null;
  this._sd_squared = null;
  this._sum = null;
  this._t0 = (t0) ? t0 : 0;
};

Sample.from_stereo = function(left, right, t0) {
  var size = left.length,
      combined = new Float32Array(size);
  for(var i = 0; i < size; i++) {
    combined.set([left[i] / 2 + right[i] / 2], i );
  }
  return new Sample(combined, t0);
};

Sample.prototype = {
  rms: function() {
    // 500: fun factor
    return Math.sqrt(Math.pow(this.mean(), 2) + this.sd_squared()) * 500;
  },

  mean: function() {
    if(this._mean === null) {
      this._mean = this.sum() / (this._buffer.length - this._t0);
    }
    return this._mean;
  },

  sd_squared: function() {
    if(this._sd_squared === null) {
      var mean = this.mean(),
        tmp_sum = 0;
      for(var i = this._t0; i < this._buffer.length; i++) {
        tmp_sum += Math.pow(this._buffer[i] - mean, 2);
      }
      this._sd_squared = tmp_sum / (this._buffer.length - this._t0 - 1);
    }

    return this._sd_squared;
  },

  sum: function() {
    if(this._sum === null) {
      this._sum = 0;
      for(var i = this._t0; i < this._buffer.length; i++) {
        this._sum += this._buffer[i];
      }
    }
    return this._sum;
  }
};
