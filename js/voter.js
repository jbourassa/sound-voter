n = navigator;
function onSuccess(stream) {
  var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(stream);
  var rec = new Recorder(mediaStreamSource);
  rec.record();

  intervalKey = setInterval(function() {
    rec.exportWAV(function(blob) {
      reader = new FileReader();
      reader.onloadend = function() {
        var arr = to_mono(new Int16Array(this.result));
        var res = rms(arr);
        console.log(Math.log(res));
      }
      reader.readAsArrayBuffer(blob)
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

function rms(sample) {
  return Math.sqrt(Math.pow(mean(sample), 2) + sd_squared(sample));
}

function sd_squared(sample) {
  var mean_calc = mean(sample),
    total = 0;

  for(var i = 0; i < sample.length; i++) {
    total += Math.pow(sample[i] - mean_calc, 2);
  }

  return total;
}

function mean(sample) {
  return sum(sample) / sample.length
}

function to_mono(sample) {
  var size = sample.length,
      mono_sound = new Int16Array(size / 2);
  for(var i = 0; i < size; i += 2) {
    var left = sample[i],
        right = sample[i+1];
    mono_sound.set([left / 2 + right / 2], i / 2);
  }
  return mono_sound;
}

function sum(sample) {
  var total = 0;
  for(var i = 0; i < sample.length; i++) { total += sample[i]; }
  return total;
}
