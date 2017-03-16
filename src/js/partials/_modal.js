$(document).ready(function () {
    currentPR = elements.siteHeader.css('padding-right');

    $('.modal').on('show.bs.modal', function (e) {
        options.scrollbarWidth = scrollbarWidth();
        $('body').css({
            paddingRight: options.scrollbarWidth
        });
        elements.siteHeader.css({
            paddingRight: parseInt(currentPR) + options.scrollbarWidth
        });
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        $('body').css({
            paddingRight: 0
        });
        elements.siteHeader.css({
            paddingRight: currentPR
        });
    });
    $(document).mouseup(function (e){
        var el = $('.modal');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            el.modal('hide');
        }
    });
});