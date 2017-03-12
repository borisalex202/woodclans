(function($) {

    var elements = {
        siteHeader:         $('.site-header'),
        mainMenu:           $('.main-menu'),
        overlay:            $('.overlay'),
        searchBlock:        $('.search-block'),
        searchResult:       $('.search-result'),
        goTop:              $('.go-to-top'),
        sliderClans:        $('.slider-clans'),
        jspContainer:       $('.jspContainer'),
        containerProfile:   $('.container.profile')
    };
    var options = {
        documentWidth:      $('body').width(),
        scrollTop:          $(document).scrollTop(),
        clanItemWidth:      $('.clan-item').width(),
        mlContainer:        parseInt($('.container.profile').css('margin-left')) + 95,
        summaryWidthClans:  0,
        jspContainerHeight: elements.jspContainer.height(),
        contProfileML:      parseInt($('.container.profile').css('margin-left')),
        contProfileMR:      parseInt($('.container.profile').css('margin-right')) + parseInt($('.container.profile').css('padding-right'))
    };

    @@include('./partials/_dropdown.js')
    @@include('./partials/_tab.js')

    $(window).resize(function () {
        options.documentWidth = $('body').width();
        options.clanItemWidth = $('.clan-item').width();
        options.contProfileML = parseInt($('.container.profile').css('margin-left'));
        options.contProfileMR = parseInt($('.container.profile').css('margin-right')) + parseInt($('.container.profile').css('padding-right'));
        options.mlContainer = ( options.documentWidth > 1199 ? options.contProfileML + 95 : $('.container.profile').css('margin-left') );


        if($('div').is(elements.sliderClans)) {
            elements.sliderClans.find('.slick-track').css({
                width: getMaxWidthTrack()
            });
            elements.sliderClans.find('.slick-list').jScrollPane();
            options.jspContainerHeight = elements.sliderClans.find('.slick-list').data('jsp').getContentHeight() + 40;
            elements.sliderClans.find('.jspContainer').height(options.jspContainerHeight);
            elements.sliderClans.find('.slick-list').css('padding-left', options.mlContainer);
            elements.sliderClans.slick('setPosition');
        }
    });
    $(window).scroll(function () {
        options.scrollTop = $(document).scrollTop();

        if(options.scrollTop >= 200) {
            elements.goTop.addClass('show');
        } else {
            elements.goTop.removeClass('show');
        }
    });
    $('.scroll-smooth').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('html, body');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    $('[data-toggle-class]').on('click', function () {
        var getClass = $(this).data('toggle-class');

       $(this).toggleClass(getClass);
    });
    $('.icon-menu').on('click', function () {
        elements.siteHeader.removeClass('active-search');

        elements.siteHeader.toggleClass('active-menu');
        elements.overlay.addClass('active');
        if(!elements.siteHeader.hasClass('active-menu')) {
            elements.overlay.removeClass('active');
        } else {
            elements.overlay.addClass('active');
        }
    });
    $('.search-btn').on('click', function () {
        elements.siteHeader.removeClass('active-menu');

        elements.siteHeader.toggleClass('active-search');
        if(!elements.siteHeader.hasClass('active-search')) {
            elements.overlay.removeClass('active');
        } else {
            elements.overlay.addClass('active');
        }
    });
    $('.search-input').keydown(function () {
        if(options.documentWidth <= 991 ) {
            elements.searchResult.slideDown();
        }
    });
    $('.dropdown').on('click', function () {
        elements.siteHeader.removeClass('active-search');
        elements.siteHeader.removeClass('active-menu');
        elements.overlay.removeClass('active');
    });

    elements.overlay.on('click', function () {
        elements.siteHeader.removeClass('active-search');
        elements.siteHeader.removeClass('active-menu');

        $(this).removeClass('active');
        elements.searchBlock.removeClass('active');
        elements.mainMenu.removeClass('active');
    });

    $('.report-user').on('click', function () {
        if(!$(this).parent().hasClass('active')) {
            $(this).slideUp();
            $(this).parent().find('.report-user-accept').slideDown();
        }
    });
    $('.report-user-cancel').on('click', function () {
        if(!$(this).parent().hasClass('active')) {
            $(this).parent().find('.report-user').slideDown();
            $(this).parent().find('.report-user-accept').slideUp();
        }
    });
    $('.report-user-accept').on('click', function () {
       $(this).text('Report sent').css('color', '#29b21a');
       $(this).parent().addClass('active');
    });

    $('.join').on('click', function () {
        if($(this).hasClass('not')) {
            $(this).find('.text').text('Joined').parent().removeClass('not');
        } else {
            $(this).find('.text').text('Join').parent().addClass('not');
        }
    });
    $('.follow')
        .on('click', function () {
            if($(this).hasClass('not')) {
                $(this).find('.text').text('Following').parent().removeClass('not');
            } else {
                $(this).find('.text').text('Follow').parent().addClass('not');
            }
        })
        .mouseover(function () {
            if(!$(this).hasClass('not')) {
                $(this).find('.text').text('Unfollow');
            }
        })
        .mouseout(function () {
            if(!$(this).hasClass('not')) {
                $(this).find('.text').text('Following')
            }
        });

    if($('div').is(elements.sliderClans)) {
        elements.sliderClans.slick({
            dots: false,
            arrows: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 4,
            swipeToSlide: true,
            swipe: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        elements.sliderClans.find('.clan-item').each(function () {
            options.summaryWidthClans += $(this).width() + 20;
        });

        elements.sliderClans.find('.slick-track').css({
            width: getMaxWidthTrack()
        });
        elements.sliderClans.find('.slick-list').jScrollPane();
        options.jspContainerHeight = elements.sliderClans.find('.slick-list').data('jsp').getContentHeight() + 40;
        elements.sliderClans.find('.jspContainer').height(options.jspContainerHeight);
        elements.sliderClans.find('.slick-list').css({
            paddingLeft: ( options.documentWidth > 1199 ? options.contProfileML + 95 : options.contProfileML )
        });
    }

    function getMaxWidthTrack() {
        if(options.documentWidth > 1199) {
            return options.summaryWidthClans + (options.mlContainer + options.contProfileMR + 5);
        } else if(options.documentWidth > 767) {
            return options.summaryWidthClans + (options.contProfileMR * 2);
        } else {
            return options.summaryWidthClans;
        }
    }

})(jQuery);