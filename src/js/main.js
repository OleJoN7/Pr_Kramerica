$(document).ready(function () {

    document.getElementsByTagName('video')[0].onended = function () {
        this.load();
        this.play();
    };

//--Scroll button-------------

    $(".scroll-icon").click(function () {
        $('html,body').animate({
            scrollTop: $(".about-sc").offset().top
        }, 1000);
    });


//---Scroll button END -----------

//-------------ISOTOPE-----------------
    $('.item-list').imagesLoaded(function(){
        $('.item-list').isotope({
            layoutMode: 'fitRows',
            itemSelector: '.portfolio'
        });
    });

    $('.filter-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $('.item-list').isotope({filter: filterValue});
    });

//---For changing class ".is-checked" on clicked buttons--(optional)

    $('.button-group').each(function (i, item) {
        var item = $(item);
        item.on('click', 'button', function () {
            item.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

//-----------ISOTOPE END----------------------

}); //---END .ready-----------

var affix = $('.welcome-section').outerHeight();

$('.welcome-hdr').affix({
    offset: {
        top: affix,
        bottom: function () {
            return (this.bottom = $('footer').outerHeight(true))
        }
    }
});