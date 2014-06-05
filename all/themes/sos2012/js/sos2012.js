/**************** sos2012.js ****************/
jQuery.noConflict();
jQuery(document).ready(function($) {
  if( $('.view-id-programs > .views-field-webform-form-body') ) {
    var descriptionTEXT = 'If you intend on obtaining CE or ACT 48 credits, or have special requests regarding this program- please indicate that here.';
    console.log("program registration form found");
    $('#edit-submitted-notes').val(descriptionTEXT);
  }


  var currentPageURL = window.location.pathname;
  var setActiveMobileLink = function() {
    $('#mobile-menu').children('select').children('option').each(function() {
      if( (currentPageURL == "/index") && ($(this).attr('value') == "/") ) {
        $(this).attr('selected',true);
      } else {
        if( $(this).attr('value') == currentPageURL ) {
          $(this).attr('selected',true);
        } else {
          $(this).attr('selected',false);
        }
      }
    });
  };
  
  
  setActiveMobileLink();

  $('#mobile-nav').change( function() {
    window.location.href = $('#mobile-nav').find('option:selected').attr('value');
  });
  
  // Track submission events for all forms with class="webform-client-form".
  $('.program-registration-form').children('.webform-client-form').submit(function() {
    _gaq.push(['_trackEvent', 'Online Program Registration', $('.program-registration-form').parent('.sos-program').children('header').children('h1.article-title').children('a').html() ]);
  });
  
  $('#apply-manually').click(function() {
    _gaq.push(['_trackEvent', 'Membership', 'Print Paper Membership Application']);
  });

  $('#user-register-form').submit(function() {
    _gaq.push(['_trackEvent', 'Membership', 'Online New Membership Application']);
  });

  $('#user-profile-form').submit(function() {
    _gaq.push(['_trackEvent', 'Membership', 'Online Membership Renewal']);
  });
  
});