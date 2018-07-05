$(function() {

  // Placeholders
  	$(document).on('focus', '#veg-form input[type=text]', function() {
  		$(this).siblings('.placeholder').addClass('active');
  	});
  	$(document).on('blur', '#veg-form input[type=text]', function() {
  		var v = $(this).val();
  		if (!v) {
  			$(this).siblings('.placeholder').removeClass('active');
  		}
  	});
  	$(document).on('click', '#veg-form .placeholder', function() {
  		$(this).next('input').focus();
  	});



    //validation
    var textFill = 0;

    $('#veg-form input[type=checkbox]').change(function(){
    checkForm();
    });

    $('#veg-form input[type=text]').keyup(function() {
      $('#veg-form input[type=text]').each(function() {
        if ($(this).val() === '') {
          textFill = 0;
        } else {
          textFill = 1;
        }
        checkForm();
      });
    });

    var checkForm = function () {
      var checkedBoxes = $('#veg-form input[type=checkbox]:checked').length;
      if (textFill === 1 && checkedBoxes > 0) {
        $('#veg-form input[type=submit]').attr('disabled', false);
      } else {
        $('#veg-form input[type=submit]').attr('disabled', true);
      }
    };


    $('#veg-submit').click(function (e) {
    e.preventDefault();
    var vegName = $('.veg-form input[name=name]').val();
    var vegEmail = $('.veg-form input[name=email]').val();
    var vegState = $('.veg-form input[name=zip]').val();
    var vegZip = $('.veg-form input[name=zip]').val();
    var emailVal = validateEmail(vegEmail);
    var zipVal = validateZip(vegZip);
    var valCount = [];



    if (valCount.length === 0) {
        // form is valid run ajax call to Qualtrics;
        var qpas = '{"QID1":"' + vegName + '","QID2":"' + vegEmail + '","QID3":"' + vegState + '","QID4":"' + vegZip + '"}';
        // var surl = "https://new.qualtrics.com/SE";
        //
        // $.ajax({
        //     url: surl,
        //     data: {
        //         "Q_PostResponse": "true",
        //         "SurveyID": "SV_2f23CV7kGyzxiv3",
        //         "QR": qpas
        //     },
        //     dataType: "jsonp",
        //     jsonp: "callback",
        //     jsonpCallback: "jsonpcallback"
        // });

        console.log('data', qpas);
        $('#veg-form .thank-you').removeClass('hidden');
    }

});

function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

function validateZip(zip) {
        //var re = /^[0-9]*(?:\.\d{1,2})?$/;    // allow only numbers [0-9]
        var re = /^-?\d+$/;
        return re.test(zip);
}

});
