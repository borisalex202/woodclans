$(document).ready(function () {
    currentPR = elements.siteHeader.css('padding-right');

    $('.modal')
        .on('show.bs.modal', function () {
            options.scrollbarWidth = scrollbarWidth();
            $('body').css({
                paddingRight: options.scrollbarWidth
            });
            elements.siteHeader.css({
                paddingRight: parseInt(currentPR) + options.scrollbarWidth
            });
        })
        .on('hidden.bs.modal', function () {
            $('body').css({
                paddingRight: 0
            });
            elements.siteHeader.css({
                paddingRight: currentPR
            });
        });
    $('[data-dismiss="modal"]').on('click', function () {
        console.log('dsfsdfsdf');
        $(this).closest('.modal').removeClass('in').attr('style', '');
        $('.modal-backdrop').remove();
    });
    $('[data-change="modal"]').on('click', function () {
       var id = $(this).data('target'),
           currentId = $('.modal.in').attr('id');

       $('#' + currentId).css('z-index', '-1');
       $(id)
           .css({
               transform: 'translate(0, 0)',
               transition: 'inherit',
               zIndex: 1100
           })
           .addClass('in');
       setTimeout(function () {
           $('#' + currentId).attr('style', '').removeClass('in');
       }, 200);
    });
    $(document).mouseup(function (e){
        var el = $('.modal');
        if (!el.is(e.target)
            && el.has(e.target).length === 0 && !$(e.target).hasClass('select2-results__option') && !$(e.target).hasClass('select2-dropdown') && !$(e.target).hasClass('modal-close')) {
            el.modal('hide').removeClass('in').attr('style', '');
        }
    });
});