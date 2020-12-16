document.addEventListener("DOMContentLoaded", function(){
  var years = _.range(1984, 2016);
  var monates = _.range(1,13);


  for (i in years) {
    var img = $(document.createElement('img'))
    img.attr("src", 'img/graph-placeholder.png');
    img.addClass('map')
    img.addClass(String(years[i]))
    if (i == 0) {
      img.css({'display': 'Block' })
    } else {
      img.css({'display': 'None' })
    }

    $('.timelapse').append(img)
    console.log(years[i])
  }


  jQuery('#time-slider')
    .slider({
      min: monates[0],
      max: monates[monates.length - 1],
      step: 1,
      //value: 0,
      tooltip: 'hide',
      ticks: monates,
      ticks_snap_bounds: 1
    })
    .on('change', function(e, ui) {
      console.log('.' + e.value.newValue)

      jQuery('.time-slider-display').html('2020.'+ e.value.newValue);
      $('.' + '2020.'+ e.value.newValue).css({'display': 'Block' })
      $('.' + '2020.'+ e.value.newValue).css({'display': 'None' })
    });

  $($('.slider-track-low'))
    .clone()
    .addClass('slider-track-total')
    .css({width: '62.5%' })
    .appendTo('.slider-track');
});
