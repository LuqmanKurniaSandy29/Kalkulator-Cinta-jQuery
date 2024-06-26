$(document).ready(function() {
    $('#btn-calculate').click(function() {
      var fname = $('#fname').val();
      var sname = $('#sname').val();
  
      if (fname === '' || sname === '') {
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Silakan masukkan kedua nama!'
        });
      } else {
        Swal.fire({
          title: "",
          text: "Sedang menghitung...",
          imageUrl: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
          imageAlt: "Loading",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
  
        $.ajax({
          url: 'https://love-calculator.p.rapidapi.com/getPercentage',
          method: 'GET',
          data: {
            fname: fname,
            sname: sname
          },
          headers: {
            'x-rapidapi-key': 'a6e4de61ddmsh3540c6b83345ec1p1ac2c5jsn941b5cddf9e8',
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com'   
          },
          success: function(response) {
            var percentage = response.percentage;
            var resultText = `Cinta antara ${fname} dan ${sname} adalah ${percentage}%`;
            var info = ''; 
        
            if (percentage >= 0 && percentage <= 20) {
                info = 'Kecocokan rendah, mungkin memerlukan usaha ekstra.';
            } else if (percentage > 20 && percentage <= 50) {
                info = 'Ada peluang, tetapi memerlukan kerja keras.';
            } else if (percentage > 50 && percentage <= 80) {
                info = 'Kecocokan yang baik, ada potensi untuk hubungan yang kuat.';
            } else {
                info = 'Kecocokan tinggi, peluang besar untuk hubungan yang bahagia.';
            }

            resultText += `<br>${info}`;
        
            $('#result').html(resultText);
            $('#result-container').show();
            Swal.close();
        },
          error: function() {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Terjadi kesalahan. Silakan coba lagi nanti.'
            });
          }
        });
      }
    });

    $('#btn-mode').click(function(){

        $('body').toggleClass('dark');

        var isDarkMode = $('body').hasClass('dark');

        if (isDarkMode == true) {
            $('#btn-mode').text("Switch to Light Mode");
        } else {
            $('#btn-mode').text("Switch to Dark Mode");
        }
    });

    $('#btn-hideResult').click(function(){
        $('#result-container').hide();
    });

    $('input').blur(function(){
        $(this).css('background-color', '#FFFFFF');
    });

    $('input').mouseenter(function() {
        $(this).css('border-color', '#FF1493'); 
    });

    $('input').mouseleave(function() {
        $(this).css('border-color', '#C9D8E4');
    });
  });
  