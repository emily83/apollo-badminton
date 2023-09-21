$(function () {

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        $('.error').hide();

        let errors = false;

        if ($('#contact-form-name').val() === '') {
            errors = true;
            $('#contact-form-name-error').text('Please enter your name').show();
        }

        if ($('#contact-form-email').val() === '') {
            errors = true;
            $('#contact-form-email-error').text('Please enter your email address').show();
        } else if (!$('#contact-form-email').val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            errors = true;
            $('#contact-form-email-error').text('Please enter a valid email address').show();
        }


        if ($('#contact-form-message').val() === '') {
            errors = true;
            $('#contact-form-message-error').text('Please enter a message').show();
        }

        if (!errors) {
            console.log('submit');
            this.submit();
        }

    });

    $('#fixture-tabs li').on('click', function() {
        const type = $(this).attr('data-type');
        $('#fixture-tabs li').removeClass('selected');
        $(this).addClass('selected');
        filterFixtures();
    });

    $('#team-filter').on('change', function() {
        filterFixtures();
    });

});

function filterFixtures() {
    const type = $('#fixture-tabs li.selected').attr('data-type');
    const team = $('#team-filter').val();
    $('#fixtures li').each(function(){
        if (($(this).attr('data-team') === team || team === '') && $(this).attr('data-type') == type) {
            $(this).removeClass('hide');
        } else if( !$(this).hasClass('hide')) {
            $(this).addClass('hide');
        }
    });
}