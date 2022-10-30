













/*!
Production™ Framework © 2018 IMPACT Branding & Design LLC. ALL RIGHTS RESERVED.
IMPACT Branding & Design LLC grants you a nonexclusive, nontransferable, limited right to access and use this 
installation of Production™ Framework. By using this installation of Production™ Framework, you agree not 
to modify, reverse engineer, disassemble, or decompile the Production™ Framework or any portion thereof. 
Any unauthorized copying, reproduction, republishing, uploading, posting, distribution, transmission, display 
or other use of this material without the express written permission of IMPACT Branding & Design is prohibited. 
*/



 





if (window.console) {console.log("Production™ Framework v3.191 loaded.\n© "+(new Date()).getFullYear()+". All rights reserved IMPACT Branding & Design LLC.");}

var mediaList = {
  
  "default": [null,null],  
  
  "desk": [null,1108],  
  
  "lap": [1107,1024],  
  
  "lap-and-up": [null,1024],  
  
  "portable": [1023,null],  
  
  "tablet": [1023,768],  
  
  "palm": [767,null]  
  
}

function editor() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  $(document).ready(function () {
    $('html').addClass('device--touch');
  });
}
function touch() {
  if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    return true
  }
  else {
    return false
  }
}
function viewport(mediaName) {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  if (mediaName) {
    if (mediaList[mediaName]) {
      if (((e[a+'Width'] <= mediaList[mediaName][0])||(mediaList[mediaName][0] == null))&&((e[a+'Width'] >= mediaList[mediaName][1])||(mediaList[mediaName][1] == null))) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == ">")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] >= mediaList[mediaName.slice(1)][1])||(mediaList[mediaName.slice(1)][1] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == "<")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] <= mediaList[mediaName.slice(1)][0])||(mediaList[mediaName.slice(1)][0] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (mediaName == "touch") {
      return touch();
    }
    else {
      throw "Media size "+mediaName+" not found in media list."
    }
  }
  else {
    return { width : e[a+'Width'] , height : e[a+'Height'] };
  }
}
$(window).load(function () {
  /* Adds class to body if user is logged into HubSpot */
  if ($('.hs-tools-menu').length > 0) {
    $('body').addClass('hs--user');
  }
  /* .hs--unwrap CSS class */
  if (!editor()) {
    $('.hs--unwrap').each(function() {
      $(this).find(".hs_cos_wrapper.hs_cos_wrapper_widget_container.hs_cos_wrapper_type_widget_container > .hs_cos_wrapper > *").unwrap();
    });
  }
});

/* Date Format */

var dateFormat = function () {
  var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
      };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) {
      return "";
    }

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var    _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(L > 99 ? Math.round(L / 10) : L),
          t:    H < 12 ? "a"  : "p",
          tt:   H < 12 ? "am" : "pm",
          T:    H < 12 ? "A"  : "P",
          TT:   H < 12 ? "AM" : "PM",
          Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
          o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

dateFormat.masks = {
  "default":      "ddd mmm dd yyyy HH:MM:ss",
  shortDate:      "m/d/yy",
  mediumDate:     "mmm d, yyyy",
  longDate:       "mmmm d, yyyy",
  fullDate:       "dddd, mmmm d, yyyy",
  shortTime:      "h:MM TT",
  mediumTime:     "h:MM:ss TT",
  longTime:       "h:MM:ss TT Z",
  isoDate:        "yyyy-mm-dd",
  isoTime:        "HH:MM:ss",
  isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

function addCommasToNumber(strNumInput) {
  var n= strNumInput.toString().split(".");
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return n.join(".");
}



/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
}));




$(window).load(function () {
  if ($('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).length > 0) {
    if (($('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).attr('content').toLowerCase().indexOf("noindex") > -1)&&(($('body').hasClass('hs--user'))||(editor()))) {
      console.log("Robots Blocked");
      $('body').append("<div id='metaRobotsNotifier' style='display:inline-block!important;position:fixed!important;bottom:10px;left:10px;padding:10px 20px;color:#ffffff;background:#232323;z-index:9999999999999;font-family:sans-serif!important;font-size:14px;box-shadow: 3px 3px 8px rgba(0,0,0,.5);cursor:pointer;' onclick='$(this).remove()' title='"+$('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).attr('content').toLowerCase()+"'><i class='fa fa-android' style='color:#28ff28'></i> Robots are blocked</div>");
    }
  }
});




function equalize() {
  $('body').find('.equalize--center').css({'margin-top':'','overflow':''});
  var eqar = [];
  for (eqc=0;eqc<$('.grid').length;eqc++) {
    if ($('.grid:eq('+eqc+')').length > 0) {
      eqar.push(eqc);
    }
  };
  for (eqeach=0;eqeach<eqar.length;eqeach++) {
    var eqheights = [0,0,0,0];
    var eqparent = $('.grid:eq('+eqar[eqeach]+')');
    var eqmedia = null;
    var eqkey = null;
    $.each(mediaList,function(key,value) {
      if (key == "default") {
        eqkey = "";
      }
      else {
        eqkey = key+"-";
      }
      for (i=0;i<4;i++) {	
        if (i==0) {
          eqmedia = "."+eqkey+"equalize";
        }
        else {
          eqmedia = "."+eqkey+"equalize--"+i;
        }
        eqparent.find(eqmedia).css({'min-height':'','overflow':'auto'});
        if (viewport(key)) {
          var eqheight = Math.max.apply(null, eqparent.find(eqmedia).map(function () {
            return $(this).outerHeight();
          }).get());
          if (eqheight > eqheights[i]) {
            eqheights[i] = eqheight;
          }
        }
      }
    });
    $.each(mediaList,function(key,value) {
      if (viewport(key)) {
        if (key == "default") {
          key = "";
        }
        else {
          key += "-";
        }
        for (i=0;i<4;i++) {
          if (i==0) {
            eqmedia = "."+key+"equalize";
          }
          else {
            eqmedia = "."+key+"equalize--"+i;
          }
          eqparent.find(eqmedia).css({'min-height':eqheights[i]+'px','overflow':'hidden'});
          eqparent.find(eqmedia).find('.equalize--center').each(function () {
            $(this).css({'margin-top':($(this).closest(eqmedia).outerHeight() - $(this).outerHeight())/2,'overflow':'hidden'});
          });
        }
      }
    });
  }
};

function vertCenter() {
  $('body').find('.equalize--center').css({'margin-top':'','overflow':''});
  var eqar = [];
  for (eqc=0;eqc<$('.equalize--wrapper').length;eqc++) {
    if ($('.equalize--wrapper:eq('+eqc+')').length > 0) {
      eqar.push(eqc);
    }
  };
  for (eqeach=0;eqeach<eqar.length;eqeach++) {
    var eqparent = $('.grid:eq('+eqar[eqeach]+')');
    var eqmedia = null;
    var eqkey = null;
    $.each(mediaList,function(key,value) {
      if (viewport(key)) {
        if (key == "default") {
          key = "";
        }
        else {
          key += "-";
        }
        for (i=0;i<4;i++) {
          if (i==0) {
            eqmedia = "."+key+"equalize";
          }
          else {
            eqmedia = "."+key+"equalize--"+i;
          }
          eqparent.find(eqmedia).find('.equalize--center').each(function () {
            $(this).css({'margin-top':($(this).closest(eqmedia).outerHeight() - $(this).outerHeight())/2,'overflow':'hidden'});
          });
        }
      }
    });
  }
}

var eqselectors = [];
$.each(mediaList,function(key,value) {
  if (key == "default") {
    eqkey = "";
  }
  else {
    eqkey = key+"-";
  }
  for (i=0;i<4;i++) {	
    if (i==0) {
      eqmedia = "."+eqkey+"equalize";
    }
    else {
      eqmedia = "."+eqkey+"equalize--"+i;
    }
    eqselectors.push(eqmedia);
  }
});
eqselectors = eqselectors.join();

//equalize();
$(document).ready(function() {
  equalize();
  $(window).resize(function () {
    equalize();
    setTimeout(function () {
      equalize()
    },100);
  });					
});
$(window).load(function () {
  equalize();
  //vertCenter();
  $('body').find('.equalize--center').css('opacity','1');
});



/* fades removed 7/9/2020 because of safari not showing the fade in - Keyser

function productionFade() {
  $('.fade--in, .fade--up, .fade--down, .fade--left, .fade--right').each(function () {
    // swapped $(window).height() for window.innerHeight
    if ($(this).offset().top + window.innerHeight*.33 <= $(document).scrollTop()+window.innerHeight) {
      $(this).addClass('production--fade');
    }
  });
}

// Fallback for slow loads
setTimeout(function () {
  productionFade();
},3000);

$(window).load(function () {
  productionFade();
  $(window).scroll(function () {
    productionFade();
  });
  $(window).resize(function () {
    productionFade();
  });
  $('.fade--load').each(function () {
    $(this).addClass('production--fade');
  });

});

end fades removed 7/9/2020 - Keyser*/



function easeTo(whereTo,offset,scrollTime) {
  $('html, body').animate({
    scrollTop: $(whereTo).offset().top + (typeof(offset) == "undefined"?0:offset) - ($('body').find('header').css('position') == 'fixed'?$('body').find('header').outerHeight():0) - ($('body').hasClass('no--navigation')||$('body').hasClass('header--static')?0:$('body').find('.header--fixed').height())
  }, (scrollTime||1000));
};

function scrollToAnchor() {
  if (window.location.hash !== '') {
    var elements = $('#' + window.location.hash.substr(1) + '-anchor');
    if (elements.length) {
      $('html, body').animate({
        scrollTop: $(elements[0]).offset().top - 150
      }, 200);
    }
  }
}
$(window).load(function () {
  setTimeout(function () {
    scrollToAnchor();
    $(window).bind('hashchange', scrollToAnchor);
  }, 10);
});




function productionAspect() {
  $('body').find('.aspectratio, .all--aspectratio, .all--aspectratio *').each(function () {
    if ($(this).attr('height')&&($(this).attr('width'))) {
      if (parseFloat($(this).attr('height')/$(this).attr('width')) > 0) {
        $(this).css('height',(Math.ceil($(this).width() * parseFloat($(this).attr('height')/$(this).attr('width')))+'px'));
      }
    }
  });
}
$(document).ready(function () {
  productionAspect();
  $(window).resize(function () {
    productionAspect();
  });
});








var hsCtaReadyCallbackLoop = 0;
function hsCtaReadyCallback(thisThing,callback,onerror) {
  if (hsCtaReadyCallbackLoop < 20) {
    hsCtaReadyCallbackLoop ++;
    hsCtaIsReady = true;
    
    $(thisThing).find(".hs-cta-wrapper").each(function () {
      if ($(this).find("a img[src*='no-cache.hubspot.com']").length > 0) {
         hsCtaIsReady = false;
      }
    });
    
    if (hsCtaIsReady == true) {
      callback(); 
    }
    else {
      setTimeout(function () {
        hsCtaReadyCallback(thisThing,callback,onerror);
      },250);
    }
  }
  else {
    if (window.console && window.console.warn) {console.warn("HubSpot CtaReady callback timeout (5s)");}
    if ($.isFunction(onerror)) {
      onerror();
    }
  }
}
$.fn.ctaready = function(callback,onerror) {	
  if (document.readyState === 'complete') {
    hsCtaReadyCallback(this,callback,onerror);
  }
  else {
    $(document).ready(function () {
      hsCtaReadyCallback(this,callback,onerror);
    });
  }
};

var hsFormReadyCallbackLoop = 0;
function hsFormReadyCallback(thisThing,callback,onerror) {
  if (hsFormReadyCallbackLoop < 20) {
    hsFormReadyCallbackLoop ++;
    hsFormIsReady = true;
    
    $(thisThing).find('.hbspt-form').each(function () {
      if ($(this).html().trim().length == 0) {
        hsFormIsReady = false;
      }
    });
        
    $(thisThing).find('#comments-listing').each(function () {
      if ($(this).find('#comment-form').length > 0) {
        if ($(this).find('#comment-form').html().trim().length == 0) {
          hsFormIsReady = false;
        }
      }
      else {
        hsFormIsReady = false;
      }
    });
    
    $(thisThing).find(".hs_cos_wrapper_type_form").each(function () {
      if ($(this).find("> div[id*='hs_form_target_']").length > 0) {
        if ($(this).find("> div[id*='hs_form_target_']").html().trim().length > 0) {

        }
        else if ($(this).find("> form").length > 0) {
          if ($(this).find("> form").html().trim().length > 0) {

          }
          else {
            hsFormIsReady = false; 
          }
        }
        else {
          hsFormIsReady = false; 
        }
      }
      else {
        hsFormIsReady = false;
      }
    });
        
    $(thisThing).find('.hs_cos_wrapper_type_blog_subscribe').each(function () {
      if ($(this).find("> div[id*='hs_form_target_']").length > 0) {
        if ($(this).find("> div[id*='hs_form_target_']").html().trim().length > 0) {
          if ($(this).find("> form").length > 0) {
            if ($(this).find("> form").html().trim().length > 0) {

            }
            else {
              hsFormIsReady = false; 
            }
          }
          else {
            hsFormIsReady = false; 
          }
        }
        else {
          hsFormIsReady = false;  
        }
      }
      else {
        hsFormIsReady = false;
      }
    });
    
    if (hsFormIsReady == true) {
      callback(); 
    }
    else {
      setTimeout(function () {
        hsFormReadyCallback(thisThing,callback,onerror);
      },250);
    }
  }
  else {
    if (window.console && window.console.warn) {console.warn("HubSpot FormReady callback timeout (5s)");}
    if ($.isFunction(onerror)) {
      onerror();
    }
  }
}
$.fn.formready = function(callback,onerror) {
  if (document.readyState === 'complete') {
    hsFormReadyCallback(this,callback,onerror);
  }
  else {
    $(document).ready(function () {
      hsFormReadyCallback(this,callback,onerror);
    });
  }
};



var hubuiId = null;
$.fn.hubui = function() {
  var thisThing;
  if ((this == undefined)||($.type(this) == "undefined")||this.is($(document))||this.is($(window))) {
    thisThing = $('html');
  }
  else if ($(this).length <= 0) {
    thisThing = $('html');
  }
  else {
    thisThing = this;
  }
  $(thisThing).find('form.hs-form label').addClass('no--transition');
  $(thisThing).addClass('hubui');
  $(thisThing)[0].offsetHeight;
  setTimeout(function () {
    $(thisThing).find('form.hs-form label').removeClass('no--transition');
  },1);

  $('.hubui').find('form.hs-form input, form.hs-form textarea').each(function () {
    if ($(this).val().trim().length > 0) {
      $(this).closest('.hs-form-field').addClass('filled valid');
    }
    else {
      $(this).closest('.hs-form-field').removeClass('filled valid');
    }
    if ($(this).closest('.inputs-list').length > 0) {
      $(this).closest('.hs-form-field').removeClass('filled valid');	
      $(this).closest('.hs-form-field').addClass('static');						
    }
  });
  $('.hubui').find('form.hs-form select').each(function () {
    $(this).closest('.hs-form-field').removeClass('filled valid');	
    $(this).closest('.hs-form-field').addClass('static');
    if ($(this).find('option:selected').is(":enabled")) {
      $(this).closest('.hs-form-field').addClass('valid');
    }	
  });
  $('.hubui').find('form.hs-form input[type="file"]').each(function () {
    $(this).closest('.hs-form-field').removeClass('filled valid');	
    $(this).closest('.hs-form-field').addClass('static');	
  });
  $('.hubui').find('form.hs-form .hs-form-field > label').click(function () {
    $(this).closest('.hs-form-field').find('input,textarea').focus();
  });
  $('.hubui').find('form.hs-form input, form.hs-form textarea').focus(function () {
    if (($(this).attr('type') == "text")||($(this).attr('type') == "email")||($(this).attr('type') == "number")||($(this).attr('type') == "tel")||($(this).attr('type') == "password")||($(this).is('textarea'))) {
      $(this).closest('.hs-form-field').addClass('focus');
      $(this).closest('.hs-form-field').removeClass('invalid');
    }
  });
  $('.hubui').find('form.hs-form input, form.hs-form textarea').blur(function () {
    if (($(this).attr('type') == "text")||($(this).attr('type') == "email")||($(this).attr('type') == "number")||($(this).attr('type') == "tel")||($(this).attr('type') == "password")||($(this).is('textarea'))) {
      $(this).closest('.hs-form-field').removeClass('focus');
      if ($(this).val().trim().length > 0) {
        $(this).closest('.hs-form-field').addClass('filled valid');
      }
      else {
        $(this).closest('.hs-form-field').removeClass('filled valid');
      }
      hubuiId = $(this);
      $(hubuiId).closest('.hs-form-field').removeClass('invalid');
      setTimeout(function () {
        if ($(hubuiId).hasClass('invalid')) {
          $(hubuiId).closest('.hs-form-field').addClass('invalid').removeClass('valid');
        }
        else {
          $(hubuiId).closest('.hs-form-field').removeClass('invalid');
        }
      },100);
    }
  });		
  $('.hubui').find('form.hs-form select').change(function () {
    if ($(this).find('option:selected').is(":enabled")) {
      $(this).closest('.hs-form-field').addClass('valid');
    }
    else {
      $(this).closest('.hs-form-field').removeClass('valid');
    }
  });
  $('.hubui').find('form.hs-form .hs-form-field > label').each(function () {
    if ($(this).text().trim().length <= 0) {
      $(this).remove();
    }
  });
  $('.hubui').find('form.hs-form .hs-field-desc').each(function () {
    if ($(this).text() != "") {
      $(this).closest('.hs-form-field').removeClass('filled valid');	
      $(this).closest('.hs-form-field').addClass('static');	
    }
  });
}
// Equalize trigger
if(typeof equalize == 'function'){
  $(document).formready(function () {
    $(document).ctaready(function () {
      equalize();
    });
  });
}









function productionCounterticker() {
  $('.counterticker:not(.counterticked)').each(function () {
    var $this = $(this);
    if ($this.offset().top + $(window).height()*.33 <= $(document).scrollTop()+$(window).height()) {
      //$(this).addClass('fade');
      $({ Counter: parseInt($this.text()||0) }).animate({ Counter: (parseFloat($this.attr('data-counterticker--to'))||0) }, {
        duration: parseInt($this.attr('data-counterticker--duration')||2000),
        easing: 'swing',
        step: function (now) {
          if (($this.attr('data-counterticker--commas')||"true").toLowerCase() != "false") {
            $this.text(addCommasToNumber((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))));
          }
          else {
            $this.text((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))));
          }
        }
      });
      $this.addClass('counterticked');
      if ($this.closest(".counterticker--parent").length > 0) {
        $this.closest(".counterticker--parent").addClass("counterticker--parent--counterticked");
      }
    }
  });
}

// Fallback for slow loads
setTimeout(function () {
  productionCounterticker();
},3000);

$(window).load(function () {
  productionCounterticker();
  $(window).scroll(function () {
    productionCounterticker();
  });
  $(window).resize(function () {
    productionCounterticker();
  });
  $('.counterticker--load').each(function () {
    var $this = $(this);
    $({ Counter: parseInt($this.text()||0) }).animate({ Counter: (parseFloat($this.attr('data-counterticker--to'))||0) }, {
      duration: parseInt($this.attr('data-counterticker--duration')||2000),
      easing: 'swing',
      step: function (now) {
        if (($this.attr('data-counterticker--commas')||"true").toLowerCase() != "false") {
          $this.text(addCommasToNumber((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))));
        }
        else {
          $this.text((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))));
        }
      }
    });
    $this.addClass('counterticked');
  });
});





function scrollItem() {
  $('.scroll--wrapper .scroll--item').each(function () {
    $(this).css('position','absolute');
    headerHeight = ($("body").find("header")?(($("body").find("header").css("position") == "fixed")?$("body").find("header").height():0):0);
    scrollTop = $(window).scrollTop() + headerHeight;
    wrapperOffset = $(this).closest('.scroll--wrapper').offset().top;
    wrapperHeight = $(this).closest('.scroll--wrapper').height();
    itemOffset = $(this).closest('.scroll--wrapper').offset().top;
    itemHeight = $(this).height();
    if (scrollTop > itemOffset) {
      if (scrollTop - itemOffset + itemHeight >= wrapperHeight) {
        // If bottom
        $(this).css('margin-top',wrapperHeight-itemHeight+'px');
      }
      else {
        // If not at at top or bottom
        $(this).css('margin-top',scrollTop - wrapperOffset+'px');
      }
    }
    else {
      // If top
      $(this).css('margin-top','');
    }               
  });
}

$(document).ready(function () {
  if ($('.scroll--wrapper .scroll--item').length>0) {
    scrollItem();
    $('.scroll--wrapper .scroll--item').each(function () {
      // Set height if needed
      if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
        $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
      }
    });
    $('.scroll--wrapper').ctaready(function () {
      $('.scroll--wrapper .scroll--item').each(function () {
        // Set height if needed
        if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
          $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
        }
      });
    });
    $(window).scroll(function () {
      scrollItem();
    });
    $(window).resize(function () {
      scrollItem();
      $('.scroll--wrapper .scroll--item').each(function () {
        // Set height if needed
        if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
          $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
        }
      });
    });
  }
});








function flexsliderSlide(sliderNum,slideNum) {
  var thisSlider = $('.flexslider--slider[data-slider="'+sliderNum+'"]');
  if (typeof(thisSlider)!="undefined") {
    if (!thisSlider.hasClass('flexslider--transition')) {
      thisSlider.addClass('flexslider--transition');
      var slideCur = thisSlider.find('.flexslider--slide.active').index();
      var slideClone = parseInt(thisSlider.attr('data-clone')||2);
      if (parseInt(slideNum) >= 0) {
        if (thisSlider.attr('data-loop') == "true") {
          slideNum += slideClone;
        }
      }
      else if (slideNum.toLowerCase() == "prev") {
        slideNum = slideCur-1;
        if (thisSlider.attr('data-loop') == "true") {
          if (slideNum < slideClone) {
            slideNum = thisSlider.find('.flexslider--slide').length-(slideClone + 1);
            thisSlider.find('.flexslider--slide').addClass('no--transition');
            for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
              thisSlider.find('.flexslider--slide:eq('+i+')').css({
                'left':100*(i - (thisSlider.find('.flexslider--slide').length - slideClone))+'%',
              });
            }
            thisSlider[0].offsetHeight;
            thisSlider.find('.flexslider--slide').removeClass('no--transition');
          }
        }
        else {
          if (slideNum < 0) {slideNum = thisSlider.find('.flexslider--slide').length-1;}
        }
      }
      else if (slideNum.toLowerCase() == "next") {
        slideNum = slideCur+1;
        if (thisSlider.attr('data-loop') == "true") {
          if (slideNum > thisSlider.find('.flexslider--slide').length-(slideClone + 1)) {
            slideNum = slideClone;
            thisSlider.find('.flexslider--slide').addClass('no--transition');
            for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
              thisSlider.find('.flexslider--slide:eq('+i+')').css({
                'left':100*(i-(slideClone-1))+'%',
              });
            }
            thisSlider[0].offsetHeight;
            thisSlider.find('.flexslider--slide').removeClass('no--transition');
          }
        }
        else {
          if (slideNum > thisSlider.find('.flexslider--slide').length-1) {
            slideNum = 0;
          }
        }
      }
      if (thisSlider.hasClass('flexslider--type--slide')) {
        for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
          thisSlider.find('.flexslider--slide:eq('+i+')').css({
            'left':(i-slideNum)*100+"%"
          });
          thisSlider.find('.flexslider--slide').removeClass('active active--clone');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li').removeClass('active');
          thisSlider.find('.flexslider--slide:eq('+slideNum+')').addClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li:eq('+(slideNum-(thisSlider.attr('data-loop') == "true"?slideClone:0))+')').addClass('active');
          if (thisSlider.attr('data-loop') == "true") {
            if (slideNum == slideClone) {
              thisSlider.find('.flexslider--slide:eq('+(thisSlider.find('.flexslider--slide').length-slideClone)+')').addClass('active--clone');
            }
            else if (slideNum == thisSlider.find('.flexslider--slide').length-(slideClone + 1)) {
              thisSlider.find('.flexslider--slide:eq('+(slideClone-1)+')').addClass('active--clone');
            }
          }
        };
      }
      else if (thisSlider.hasClass('flexslider--type--fade')) {
        for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
          thisSlider.find('.flexslider--slide').removeClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li').removeClass('active');
          thisSlider.find('.flexslider--slide:eq('+slideNum+')').addClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li:eq('+slideNum+')').addClass('active');
        };
      }
      flexsliderAuto(sliderNum);
      setTimeout(function () {
        thisSlider.removeClass('flexslider--transition');
      },(parseFloat(thisSlider.find('.flexslider--slide').css('transition-duration')))*1000);
    }
  }
}
function flexsliderAuto(sliderNum) {
  if ($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('duration')) {
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').stop();
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').css('width','0%');
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').animate({width:'100%',mozTransition:'width 500ms ease-out',webkitTransition:'width 500ms ease-out',transition:'width 500ms ease-out'},
                                                                     parseInt($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('duration'))*1000,
                                                                     function(){
      $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').css('width','0%');
      flexsliderSlide($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('slider'),'next');
    }                                                             );
  }   
}
function flexsliderSize() {
  $('.flexslider--slider').each(function () {
    $(this).find('.flexslider--slide--wrapper').css('height','');
    $(this).find('.flexslider--slide').each(function() {
      if ($(this).height() > $(this).closest('.flexslider--slide--wrapper').height()) {
        $(this).closest('.flexslider--slide--wrapper').css({
          'height':$(this).height()+'px'
        });
      }
    });
  });
}
$(document).ready(function () {
  $(window).resize(function () {
    flexsliderSize();
  });
});
$(window).load(function () {
  flexsliderSize();
  $('.flexslider--slider').each(function () {
    var slideClone = parseInt($(this).attr('data-clone')||2);
    if ($(this).attr('data-loop') !== "true") {
      $(this).find('.flexslider--slide:first-child').addClass('active');
    }
    if ($(this).attr("data-appendcontrols")) {
      if ($(this).attr("data-appendcontrols").toLowerCase() == "true") {
        for(i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').append("<li></li>");
        };
      }
    }
    else {
      for(i=0;i<$(this).find('.flexslider--slide').length;i++) {
        $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').append("<li></li>");
      };
    }
    $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"] li:first-child').addClass('active');
    if ($(this).find('.flexslider--slide').length <= 1) {
      $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $('.flexslider--prev[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $('.flexslider--next[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $(this).addClass('flexslider--type--static');
    }
    else {
      if ($(this).attr('data-loop') == "true") {
        for (c=0;c<slideClone;c++) {
          $(this).find('.flexslider--slide:eq('+c+')').clone().addClass(c==0?'active--clone':'').appendTo($(this).find('.flexslider--slide--wrapper > span'));
        }
        for (c=0;c<slideClone;c++) {
          $(this).find('.flexslider--slide:eq('+($(this).find('.flexslider--slide').length-(slideClone + c + 1))+')').clone().prependTo($(this).find('.flexslider--slide--wrapper > span'));
        }
        $(this).find('.flexslider--slide:eq('+slideClone+')').addClass('active');
      }
      flexsliderAuto($(this).data('slider'));
    }
    $(this).addClass("flexslider--initialized");
  });
  $('.flexslider--slider.flexslider--type--slide').each(function () {
    if ($(this).find('.flexslider--slide').length > 1) {
      if ($(this).attr('data-loop') == "true") {
        for (i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $(this).find('.flexslider--slide:eq('+i+')').css({
            'left':100*(i-parseInt($(this).attr('data-clone')||2))+'%',
          });
        }
      }
      else {
        for (i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $(this).find('.flexslider--slide:eq('+i+')').css({
            'left':100*i+'%',
          });
        }
      }
    }
  });
  flexsliderSize();
  $('.flexslider--controls').each(function () {
    for (i=0;i<$(this).find('li').length;i++) {
      $(this).find('li:eq('+i+')').attr('onclick',"flexsliderSlide($(this).closest('.flexslider--controls').data('slider'),"+i+");");
    }
  });
  $('.flexslider--prev').attr('onclick',"flexsliderSlide($(this).data('slider'),'prev');");
  $('.flexslider--next').attr('onclick',"flexsliderSlide($(this).data('slider'),'next');");
});





/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,n){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})})(e),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",n)},teardown:function(){e(this).unbind("resize",n)}};var t=250,n=function(){s=(new Date).getTime(),o=s-r,o>=t?(r=s,e(this).trigger("throttledresize")):(i&&clearTimeout(i),i=setTimeout(n,t-o))},r=0,i,s,o}(e),function(e,t){function p(){var e=s();e!==o&&(o=e,r.trigger(i))}var r=e(t),i="orientationchange",s,o,u,a,f={0:!0,180:!0},l,c,h;if(e.support.orientation){l=t.innerWidth||r.width(),c=t.innerHeight||r.height(),h=50,u=l>c&&l-c>h,a=f[t.orientation];if(u&&a||!u&&!a)f={"-90":!0,90:!0}}e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;o=s(),r.bind("throttledresize",p)},teardown:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;r.unbind("throttledresize",p)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=s(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=s=function(){var r=!0,i=n.documentElement;return e.support.orientation?r=f[t.orientation]:r=i&&i.clientWidth/i.clientHeight<1.1,r?"portrait":"landscape"},e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)}(e,this),function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)}(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this)});








/* CUSTOM MODERNIZR DETECTS */
/* https://modernizr.com/download/?-backgroundsize-bgsizecover-boxshadow-cssgradients-cssmask-csstransforms-csstransitions-opacity-rgba-textshadow-setclasses */
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,s,i,a;for(var l in b)if(b.hasOwnProperty(l)){if(e=[],t=b[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),x.push((o?"":"no-")+a.join("-"))}}function s(e){var t=C.className,n=Modernizr._config.classPrefix||"";if(S&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),S?C.className.baseVal=t:C.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):S?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(e,t){return!!~(""+e).indexOf(t)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(e,t){return function(){return e.apply(t,arguments)}}function u(e,t,n){var o;for(var s in e)if(e[s]in t)return n===!1?e[s]:(o=t[e[s]],r(o,"function")?f(o,n||t):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var s=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(s){var i=s.error?"error":"log";s[i].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function p(){var e=t.body;return e||(e=i(S?"svg":"body"),e.fake=!0),e}function g(e,n,r,o){var s,a,l,f,u="modernizr",d=i("div"),c=p();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=i("style"),s.type="text/css",s.id="s"+u,(c.fake?c:d).appendChild(s),c.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=C.style.overflow,C.style.overflow="hidden",C.appendChild(c)),a=n(d,e),c.fake?(c.parentNode.removeChild(c),C.style.overflow=f,C.offsetHeight):d.parentNode.removeChild(d),!!a}function m(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(t[o])+":"+r+")");return s=s.join(" or "),g("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return n}function v(e,t,o,s){function f(){d&&(delete E.style,delete E.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,c,p,g,v,y=["modernizr","tspan","samp"];!E.style&&y.length;)d=!0,E.modElem=i(y.shift()),E.style=E.modElem.style;for(p=e.length,c=0;p>c;c++)if(g=e[c],v=E.style[g],a(g,"-")&&(g=l(g)),E.style[g]!==n){if(s||r(o,"undefined"))return f(),"pfx"==t?g:!0;try{E.style[g]=o}catch(h){}if(E.style[g]!=v)return f(),"pfx"==t?g:!0}return f(),!1}function y(e,t,n,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+k.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?v(a,t,o,s):(a=(e+" "+z.join(i+" ")+i).split(" "),u(a,t,n))}function h(e,t,r){return y(e,n,n,t,r)}var x=[],b=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){b.push({name:e,fn:t,options:n})},addAsyncTest:function(e){b.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var C=t.documentElement,S="svg"===C.nodeName.toLowerCase(),_=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=_,Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",o=0,s=_.length-1;s>o;o++)e=0===o?"to ":"",r+=t+_[o]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var a=i("a"),l=a.style;return l.cssText=r,(""+l.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("opacity",function(){var e=i("a").style;return e.cssText=_.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("rgba",function(){var e=i("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1});var T="Moz O ms Webkit",k=w._config.usePrefixes?T.split(" "):[];w._cssomPrefixes=k;var z=w._config.usePrefixes?T.toLowerCase().split(" "):[];w._domPrefixes=z;var P={elem:i("modernizr")};Modernizr._q.push(function(){delete P.elem});var E={style:P.elem.style};Modernizr._q.unshift(function(){delete E.style}),w.testAllProps=y,w.testAllProps=h,Modernizr.addTest("backgroundsize",h("backgroundSize","100%",!0)),Modernizr.addTest("bgsizecover",h("backgroundSize","cover")),Modernizr.addTest("boxshadow",h("boxShadow","1px 1px",!0)),Modernizr.addTest("cssmask",h("maskRepeat","repeat-x",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),Modernizr.addTest("csstransitions",h("transition","all",!0));var N=w.testProp=function(e,t,r){return v([e],n,t,r)};Modernizr.addTest("textshadow",N("textShadow","1px 1px")),o(),s(x),delete w.addTest,delete w.addAsyncTest;for(var j=0;j<Modernizr._q.length;j++)Modernizr._q[j]();e.Modernizr=Modernizr}(window,document);

/* MOBILE NAV */

function mobileNav() {
  if (!$("body").hasClass('mobile-nav--showing')) {
    $("body").addClass('mobile-nav--showing');
  }
  else {
    $("body").removeClass('mobile-nav--showing');
  }
}

/* HASH SCROLL */
$(document).ready(function () {
  if (window.location.hash) {
    if (window.location.hash.length > 1) {
      thisHash = window.location.hash.slice(1); 
      if ($("body").find("#"+thisHash).length > 0) {
        easeTo($("body").find("#"+thisHash),-10);
      }
    }
  }
  $("body").find("a[href^='#']").click(function (e) {
    thisHash = $(this).attr('href').slice(1);
    if ($("body").find("#"+thisHash).length > 0) {
      easeTo($("body").find("#"+thisHash),-10);
      e.preventDefault();
      return false;
    }
  });
});

/* HubUI */
$(document).ready(function () {
  $("body").formready(function () {
    $("body").hubui();
  });
});


// /* FLEXSLIDER */
// $(document).ready(function () {
//   $("body").find(".flexslider--slide--wrapper").on("swipeleft",function() {
//     var thisName = $(this).closest(".flexslider--slider").attr("data-slider");
//     flexsliderSlide(thisName,"next");
//   });
//   $("body").find(".flexslider--slide--wrapper").on("swiperight",function() {
//     var thisName = $(this).closest(".flexslider--slider").attr("data-slider");
//     flexsliderSlide(thisName,"prev");
//   });
// });


/* FANCYBOX */

// $(document).ready(function () {
//   $("body").find(".fancybox").fancybox({
//     aspectRatio:true,
//     infobar: false,
//     autoSize: true,
//     loop: true,
//     buttons: [
//       "close"
//     ]
//   });
//   $.fancybox.defaults.hash = false;
// });


/* FIRST SECTION PADDING */
function sizeHeader() {
  var height = $("header").outerHeight();
  $('.body-container-wrapper .hs_cos_wrapper_widget_container > *:first-child .section').css("padding-top",height+"px");
  $('.pagetype--search .body-container-wrapper .section--hero').css("padding-top",height+"px");
  $('.pagetype--blog #blog-body').css("padding-top",height+"px");
  if ($(window).width() < 1024) {
    $('.body-container-wrapper .hs_cos_wrapper_widget_container > *:first-child .section').css("padding-top","0px");
    $('.pagetype--search .body-container-wrapper .section--hero').css("padding-top","0px");
    $('.pagetype--blog #blog-body').css("padding-top","0px");    
  } else {
    $('.body-container-wrapper .hs_cos_wrapper_widget_container > *:first-child .section').css("padding-top",height+"px");
    $('.pagetype--search .body-container-wrapper .section--hero').css("padding-top",height+"px");
    $('.pagetype--blog #blog-body').css("padding-top",height+"px");
  }
}
$(document).ready(function() {
  sizeHeader();
});
$(window).on("resize", function() {
  sizeHeader();
}).resize();


/* identify visitor endpoint for custom reporting */
function identifyVisitor( ccKey, ccVal ) {
  //if params arent provided
  //use default key:value
  ccKey = typeof ccKey !== 'undefined' ? ccKey : 'cc_identify_visitor';
  ccVal = typeof ccVal !== 'undefined' ? ccVal : window.location.pathname;

  var identify_obj = {};

  identify_obj[ccKey] = ccVal;

  console.log('identify visitor ', identify_obj);

  var _hsq = window._hsq = window._hsq || [];
  _hsq.push(["identify", identify_obj ]);
  
  _hsq.push(["trackEvent", {
        id: "Identify Visitor",
        value: 1
    }]);
} 

// adjusts the mobile menu
// by making top 10 link clickable
if ($(window).width() <= 1024) {
  console.log('width 1025 CCC');
  try { 
    var statePagesSelector = $('#hs_cos_wrapper_module_1560952491505260 > div.mobilenav.lap-and-up-visuallyhidden > div.mobilenav--nav > span > ul > li:nth-child(3) > div > a');
  } catch(e) { 
    console.log('Selector is invalid'); 
  }
  
  statePagesSelector.attr('href', "https://www.constructconnect.com/construction-near-me");
  
}