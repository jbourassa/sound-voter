function onSuccess(stream) {
  var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(stream);
  var rec = new Recorder(mediaStreamSource, { workerPath: '/js/recorderWorker.js'});
  rec.record();

  intervalKey = setInterval(function() {
    rec.getBuffer(function(buffers) {
      var sample = Sample.from_stereo(buffers[0], buffers[1]);
      console.log(sample.rms().toFixed(2));
      rec.clear();
    });
  }, 1000);
}


function onError(e) {
  console.log('nope :(');
}

document.addEventListener("DOMContentLoaded", function(){



  document.querySelector('a').addEventListener('click', function() {
    navigator.webkitGetUserMedia({ audio: true }, onSuccess, onError);
  });
}, false );




function Sample(buffer) {
  this._buffer = buffer;
  this._mean = null;
  this._sd_squared = null;
  this._sum = null;
}

Sample.from_stereo = function(left, right) {
  var size = left.length,
      combined = new Float32Array(size);
  for(var i = 0; i < size; i++) {
    combined.set([left[i] / 2 + right[i] / 2], i );
  }
  return new Sample(combined);
}

Sample.prototype = {
  rms: function() {
    return Math.sqrt(Math.pow(this.mean(), 2) + this.sd_squared());
  },

  mean: function() {
    if(this._mean === null) {
      this._mean = this.sum() / this._buffer.length;
    }
    return this._mean;
  },

  sd_squared: function() {
    if(this._sd_squared === null) {
      var mean = this.mean();
      for(var i = 0; i < this._buffer.length; i++) {
        this._sd_squared += Math.pow(this._buffer[i] - mean, 2);
      }
    }

    return this._sd_squared;
  },

  sum: function() {
    if(this._sum === null) {
      this._sum = 0;
      for(var i = 0; i < this._buffer.length; i++) {
        this._sum += this._buffer[i];
      }
    }
    return this._sum;
  }
};
