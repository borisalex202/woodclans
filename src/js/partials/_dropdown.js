$('[data-toggle="dropdown"]').on('click', function (e) {
    e.preventDefault();

    $(this).closest('.dropdown').toggleClass('open');
});

$('[data-toggle="dropdown-close"]').on('click', function (e) {
    e.preventDefault();

    $(this).closest('.dropdown').removeClass('open');
});

$(document).mouseup(function (e){
    var el = $('.dropdown-menu');
    if (!el.is(e.target)
        && el.has(e.target).length === 0) {
        el.closest('.dropdown').removeClass('open');
    }
});

$('.dropdown').on('click', function () {
    elements.siteHeader.removeClass('active-search');
    elements.siteHeader.removeClass('active-menu');
    elements.overlay.removeClass('active');
});