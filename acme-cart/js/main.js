/** Custom JQuery functions **/

$(document).ready(function(){
  refreshSum();
  if ($(window).width() < 500) {
   $('header .acme-logo').removeClass('col-xs-2');
   $('header .acme-logo').addClass('col-xs-3');
   $('header .acme-brand').removeClass('col-xs-10');
   $('header .acme-brand').addClass('col-xs-9');
 }
})

$('input[type=number]').on('change', changeQuantity);
$('.btns span').on('click', changeQuantity);
$('input[type=number]').on('keydown', function (event){
  /*
  Key Codes: 0-9 = 48-57, delete = 8
   */
  if ( $(this).val() == 1 )
  {
    if ( event.which != '48' && event.which != '8') event.preventDefault();
  } else if ( $(this).val() > 1 && event.which != '8') {
    event.preventDefault();
  } else {
    if ( (event.which < '48' || event.which > '57') && event.which != '8') event.preventDefault();
  }
});

function changeQuantity(event){

  if ($(this).is('input')){
    if( $(this).val() > 10 || $(this).val() < 1)
    {
      event.preventDefault();
    } else{
      var $elem = $(this);
      $elem = $elem.parents().eq(1)
      var rowSum = parseFloat($elem.find('td>input').val()) * parseFloat($elem.find('td:eq(2)>span').text());
      var $totalElem = $elem.find('td:eq(3)>span');
      $totalElem.fadeOut(200, function(){
        $totalElem.children('span').text(parseFloat(rowSum).toFixed(2));
        refreshSum();
        $(this).fadeIn();
      });
    }
  } else if ($(this).is('span')) {

    var $elem = $(this).parents().eq(3).find('input[type=number]');
    var qtyVal = $elem.val();

    if ($(this).hasClass('btn-up')){
      if (qtyVal < 10) {
        $elem.val(parseInt(qtyVal) + 1);
        $elem = $elem.parents().eq(1)
        var rowSum = parseFloat($elem.find('td>input').val()) * parseFloat($elem.find('td:eq(2)>span').text());
        var $totalElem = $elem.find('td:eq(3)>span');
        $totalElem.fadeOut(200, function(){
          $totalElem.children('span').text(parseFloat(rowSum).toFixed(2));
          refreshSum();
          $(this).fadeIn();
        });
      }
    } else if ($(this).hasClass('btn-down')) {
      if (qtyVal > 0){
        $elem.val(parseInt(qtyVal) - 1);
        $elem = $elem.parents().eq(1)
        var rowSum = parseFloat($elem.find('td>input').val()) * parseFloat($elem.find('td:eq(2)>span').text());
        var $totalElem = $elem.find('td:eq(3)>span');
        $totalElem.fadeOut(200, function(){
          $totalElem.children('span').text(parseFloat(rowSum).toFixed(2));
          refreshSum();
          $(this).fadeIn();
        });
      }
    }
  }
}

function refreshSum(){

    var subtotal = 0;

    $('#products>tbody>tr:not([style*="display: none"])>td:nth-child(4)>span>span').each(function(){
      subtotal+=parseFloat($(this).text());
    });

    var $subtotalElem = $('#subtotal>span');
    var $vatElem = $('#vat>span');
    var $totalElem = $('#total>span');

    var sumVAT = subtotal*20/100;

    // Changing parameters
    $subtotalElem.fadeOut(200, function(){
      $(this).children('span').text(parseFloat(subtotal).toFixed(2));
      $(this).fadeIn();
    });

    $vatElem.fadeOut(200, function(){
      $(this).children('span').text(parseFloat(sumVAT).toFixed(2));
      $(this).fadeIn();
    });

    $totalElem.fadeOut(200, function(){
      $(this).children('span').text(parseFloat(subtotal+sumVAT).toFixed(2));
      $(this).fadeIn();
    });
}

$('.glyphicon-trash').on('click', function(){
  $(this).parents().eq(1).fadeOut(1000, function(){
    refreshSum();
  });
});

$('#purchase button').on('click', function(){

  //Fill data array
  var purchase = {};

  $('#products>tbody>tr:not([style*="display: none"])>td:first-child').each(function(index, value){
    purchase[index] = {};
    purchase[index]['name'] = $(this).text();
  });
  $('#products>tbody>tr:not([style*="display: none"])>td:nth-child(4)>span>span').each(function(index, value){
    purchase[index]['price'] = $(this).text();
  });

  purchase['subtotal'] = $('#subtotal>span>span').text();
  purchase['vat'] = $('#vat>span>span').text();
  purchase['total'] = $('#total>span>span').text();

  /*
  $.ajax({
    method: "POST",
    url: 'http://www.google.es',
    data: JSON.stringify(purchase),
    dataType: "json",
    crossdomain: true
  })
  .success(function( msg ){
    $('#modal-ok').modal();
  })
  .fail(function(){
    $('.alert-danger').fadeIn();
  })
  */

  // For test purpouses
  var num = Math.floor((Math.random() * 10) + 1);
  console.log(num);
  if ( num % 2 == true )
  {
    $('#modal-ok').modal();
  }
  else {
    $('.alert-danger').parents().eq(1).fadeIn(800);
    window.setTimeout(function(){$('.alert-danger').parents().eq(1).slideUp('slow');}, 3000);
  }
});
