  var module_4358371 = (function() {
    var __hs_messages = {};
    i18n_getmessage = function() {
      return hs_i18n_getMessage(__hs_messages, hsVars['language'], arguments); 
    };
    i18n_getlanguage = function() {
      return hsVars['language']; 
    };
$(document).ready(function() {
  if ($('.bop--head--topics .hs-menu-wrapper li a.active').length) {
    if ($('.bop--head--topics .hs-menu-wrapper li a.active').text() == 'Recent') {
      $('.bop--head--topics .hs-menu-wrapper li a.active').closest('.hs-menu-wrapper').closest('li').find('.menu--name').html('Categories');
    } else {
      $('.bop--head--topics .hs-menu-wrapper li a.active').closest('.hs-menu-wrapper').closest('li').find('.menu--name').html($('.bop--head--topics .hs-menu-wrapper li a.active').text());     
    }
  }
  $('.bop--head--topics .hs-menu-wrapper li a').each(function() {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).closest('ul').find('a').removeClass('active');
      $(this).addClass('active');
    }
  });
  if ($('body').find('.bop--head--search input').length) {
    $('.bop--head--search input').focus(function() {
      $('.bop--head--search').addClass('active');
    });
    $('.bop--head--search input').focusout(function() {
      $('.bop--head--search').removeClass('active');
    });
    $('.bop--head--search .fa').click(function() {
      blogSearch($(this).closest('form'));
    });
  }

  var blogNavTransition = false;
  $(".bop--mobilemenu--top .bop--mobilemenu--top--item > a").click(function() {
    var thisThing = $(this);
    var thisRel = $(this).attr('rel');
    var thisActive = $(this).hasClass('active');
    var thisPair = $(".bop--mobilemenu--bottom .bop--mobilemenu--bottom--item[rel='"+thisRel+"']");
    var thisPairInner = thisPair.find(".bop--mobilemenu--bottom--item--inner");

    if(!blogNavTransition) {
      if (!thisActive) {
        if ($(".bop--mobilemenu--top .bop--mobilemenu--top--item > a.active").length == 0) {
          $(thisPair).addClass('active');
          $(this).addClass('active');
          $(thisPair).css('max-height',$(thisPairInner).outerHeight()+'px');
          blogNavTransition = true;
          setTimeout(function () {
            blogNavTransition = false;
          },500);
        }
        else {
          var oldThis = $(".bop--mobilemenu--top ul li > a.active");
          var oldThisPair = $('.bop--mobilemenu--bottom .bop--mobilemenu--bottom--item.active');
          var oldThisPairInner = oldThisPair.find(".bop--mobilemenu--bottom--item--inner");
          $(oldThisPair).addClass('no--transition');
          $(oldThisPair).css('max-height',$(oldThisPairInner).outerHeight()+'px');
          $(oldThisPairInner)[0].offsetHeight;
          $(oldThisPair).removeClass('no--transition');
          $(oldThisPairInner)[0].offsetHeight;
          $(oldThis).removeClass('active');
          $(oldThisPair).removeClass('active');
          $(oldThisPair).css('max-height','');

          setTimeout(function () {
            $(thisPair).addClass('active');
            $(thisThing).addClass('active');
            $(thisPair).css('max-height',$(thisPairInner).outerHeight()+'px');
          },500);
          blogNavTransition = true;
          setTimeout(function () {
            blogNavTransition = false;
          },1000);
        }
      } else {   
        $(thisPair).addClass('no--transition');
        $(thisPair).css('max-height',$(thisPairInner).outerHeight()+'px');
        $(thisPairInner)[0].offsetHeight;
        $(thisPair).removeClass('no--transition');
        $(thisPairInner)[0].offsetHeight;
        $(this).removeClass('active');
        $(thisPair).removeClass('active');
        $(thisPair).css('max-height','');
        blogNavTransition = true;
        setTimeout(function () {
          blogNavTransition = false;
        },500);
      }
    }
  });
  
  $("body").find(".bop--single--comments").formready(function () {
  	$(".bop--single--comments").hubui();
  });
  $("body").find(".bop--listing--leadmagnet--form").formready(function () {
  	$(".bop--listing--leadmagnet--form").hubui();
  });
});  
  })();
