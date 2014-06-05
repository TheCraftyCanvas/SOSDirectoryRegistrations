/**
* SOSregistration.js
*
*
**/
var pagetype = "";

jQuery.noConflict();
jQuery(document).ready(function($) {

  var path = document.location.pathname;

  if( path.indexOf('admin/people/create') > 0 )
  { pagetype = "admin_new_app"; }
  else if( path.indexOf('membership/apply') > 0 )
  { pagetype = "new_app"; }
  else if( path.indexOf('edit/main') > 0 )
  { pagetype = "existing"; }
  else if( path.indexOf('edit') > 0 )
  { pagetype = "existing-user-account-form"; }


  //console.log('new user self-registration page loaded');
  $('#edit-submit').click( function() {
    if( pagetype=="new_app" ) {
      if ( ( $('#edit-profile-main-field-username3-und-0-value').val() != "" ) || ( $('#edit-mail').val().indexOf('@netcourrier.com') > -1 ) ){
        alert('Oops! An error was encountered, please try again.');
        return false;
      } else {
        return true;
      }
    }
  });


  switch (pagetype) {
    case "admin_new_app":
    {
      var userAccountDiv = $('#edit-account').html();
      $('#edit-account').remove();
      $(userAccountDiv).insertAfter('#edit-profile-main');

      var accountPreface = "<p>Please provide a username so that you can login and update your account info and gain access to the growing online services of SOS.</p>"
      $(accountPreface).insertBefore('#edit-account');

      modifyProfileSection();

      $('#edit-locations').hide().css({ 'visibility':'hidden','display':'none' });
      $('#edit-metatags').hide().css({ 'visibility':'hidden','display':'none' });
      //console.log('admin create new user page loaded');
      break;
    }
    case "new_app":
    {
      $('li.crumb > a').html('Membership > Apply');
      $('#page-title').html("Apply for Membership");
      var paperAppLink = '<p>You can complete the application process online by filling out the form below.  However, if you would rather apply by paper, <a class="faux-button" style="margin-left:0;" id="apply-manually" href="/sites/default/files/application.pdf" target="_blank">click here to print an application</a> that you can submit by mail.</p>';
      $(paperAppLink).insertBefore('#content > .region-content');
      var userAccountDiv = $('#edit-account').html();
      $('#edit-account').remove();
      $(userAccountDiv).insertAfter('#edit-profile-main');

      var accountPreface = "<p>Please provide a username so that you can login and update your account info and gain access to the growing online services of SOS.</p>";
      $(accountPreface).insertBefore('.form-item.form-type-textfield.form-item-name');

      modifyProfileSection();

      $('#edit-locations').hide().css({ 'visibility':'hidden','display':'none' });
      $('#profile-main-field-username3-add-more-wrapper').css({ 'display':'none' });

      break;
    }
    case "existing":
    {
      $('li.crumb:nth-child(1) > a').html();
      $('li.crumb:nth-child(2) > a').html('Member Profile');
      $('#page-title').html("Review/Modify Contact Info");

      modifyProfileSection();

      //console.log('existing user edit page loaded');

      break;
    }
    case "existing-user-account-form":
    {
      $('li.crumb > a').html('SOS Online Account Information');
      $('#page-title').html("Review/Modify SOS Online Account Info");

      var accountPreface = "<p>Please provide a username so that you can login and update your account info and gain access to the growing online services of SOS.</p>"
      $(accountPreface).insertBefore('#edit-account');

      var htmlInsertion = '<fieldset id="account-info" class="collapsible form-wrapper collapse-processed">';
      htmlInsertion += '<legend><span class="fieldset-legend"><a class="fieldset-title" href="#"><span class="fieldset-legend-prefix element-invisible">Hide</span> Account Credentials</a><span class="summary"></span></span></legend><div class="fieldset-wrapper with-legend">'
      htmlInsertion += $('.form-item-mail').html() + $('.form-item-pass').html() + '<div style="font-weight:bold;font-style:italic;font-size:110%;margin-top:10px;border-top:1px solid #999;padding-top:5px;">If changing any of the above credentials for your account, please provide your current password below:</div>' + $('.form-item-current-pass').html();
      htmlInsertion += '</div></fieldset>'
      $('.form-item-mail').remove();
      $('.form-item-pass').remove();
      $('.form-item-current-pass').remove();
      $(htmlInsertion).insertBefore('#edit-contact');

      $('#edit-contact').hide().css({ 'visibility':'hidden','display':'none' });
      $('#edit-metatags').hide().css({ 'visibility':'hidden','display':'none' });
      $('#edit-og-user-group-ref').hide().css({ 'visibility':'hidden','display':'none' });
      $('#edit-og-other-user-group-ref').hide().css({ 'visibility':'hidden','display':'none' });

      //console.log('existing user account edit page loaded');

      break;
    }
    default: {}
  }

  $('#edit-profile-main-field-organization-name-und-0-value').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });
  $('#edit-profile-main-field-street-address-und-0-value').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });
  $('#edit-profile-main-field-street-address2-und-0-value').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });
  $('#edit-profile-main-field-city-und-0-value').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });
  $('#edit-profile-main-field-state-und').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });
  $('#edit-profile-main-field-zip-und-0-value').change( function() {
    if(pagetype != "") { directory_address_location_sync(); }
  });

  // use the private email contact field as the primary email for the user account
  $('#edit-profile-main-field-email-und-0-email').change( function() {
    $('#edit-mail').val( $('#edit-profile-main-field-email-und-0-email').val() );
  });

 });

 function directory_address_location_sync() {
   var j = jQuery.noConflict();

   //concatenate the profile address fields (excluding the state since it has a default value)
   var location_check_string = "";
     location_check_string += j('#edit-profile-main-field-organization-name-und-0-value').val();
     location_check_string += j('#edit-profile-main-field-street-address-und-0-value').val();
     location_check_string += j('#edit-profile-main-field-street-address2-und-0-value').val();
     location_check_string += j('#edit-profile-main-field-city-und-0-value').val();
     location_check_string += j('#edit-profile-main-field-zip-und-0-value').val();
    //console.log("location_check_string is: " + location_check_string);

   //if a string exists, then the corresponding location needs to be updated
   if( location_check_string != "" )
   {
     j('#edit-locations-0-name').val( j('#edit-profile-main-field-organization-name-und-0-value').val() );
     j('#edit-locations-0-street').val( j('#edit-profile-main-field-street-address-und-0-value').val() );
     j('#edit-locations-0-additional').val( j('#edit-profile-main-field-street-address2-und-0-value').val() );
     j('#edit-locations-0-city').val( j('#edit-profile-main-field-city-und-0-value').val() );
     j('#edit-locations-0-province').val( j('#edit-profile-main-field-state-und').val() );
     j('#edit-locations-0-postal-code').val( j('#edit-profile-main-field-zip-und-0-value').val() );
  //  //console.log("location fields synced");
   }

   else {
   // check delete location option
    //console.log("location deletion option required= this is processed by form submit handler php function");
   }


   //concatenate the profile address fields (excluding the state since it has a default value)
   var location2_check_string = "";
     location2_check_string += j('#edit-profile-main-field-organization-pvt-und-0-value').val();
     location2_check_string += j('#edit-profile-main-field-street-address-pvt-und-0-value').val();
     location2_check_string += j('#edit-profile-main-field-street-address2-pvt-und-0-value').val();
     location2_check_string += j('#edit-profile-main-field-city-state-zip-pvt-und-0-value').val();
     location2_check_string += j('#edit-profile-main-field-zip-code-pvt-und-0-value').val();
    //console.log("location2_check_string is: " + location2_check_string);

   //if a string exists, then the corresponding location needs to be updated
   if( location2_check_string != "" )
   {
     j('#edit-locations-1-name').val( j('#edit-profile-main-field-organization-pvt-und-0-value').val() );
     j('#edit-locations-1-street').val( j('#edit-profile-main-field-street-address-pvt-und-0-value').val() );
     j('#edit-locations-1-additional').val( j('#edit-profile-main-field-street-address2-pvt-und-0-value').val() );
     j('#edit-locations-1-city').val( j('#edit-profile-main-field-city-state-zip-pvt-und-0-value').val() );
     j('#edit-locations-1-province').val( j('#edit-profile-main-field-state-pvt-und').val() );
     j('#edit-locations-1-postal-code').val( j('#edit-profile-main-field-zip-code-pvt-und-0-value').val() );
  //  //console.log("location fields synced");
   }

   else {
   // check delete location option
    //console.log("location deletion option required= this is processed by form submit handler php function");
   }


 } // function directory_address_location_sync()


 function copyContactInfo() {
    var j = jQuery.noConflict();
    j('#edit-profile-main-field-professional-title-pvt-und-0-value').val( j('#edit-profile-main-field-professional-title-und-0-value').val() );

    j('#edit-profile-main-field-organization-pvt-und-0-value').val( j('#edit-profile-main-field-organization-name-und-0-value').val() );

    j('#edit-profile-main-field-street-address-pvt-und-0-value').val( j('#edit-profile-main-field-street-address-und-0-value').val() );
    if( j('#edit-profile-main-field-street-address2-und-0-value').val() != "" )
    {
      j('#edit-profile-main-field-street-address-pvt-und-0-value').val( j('#edit-profile-main-field-street-address-pvt-und-0-value').val() + "\n" + j('#edit-profile-main-field-street-address2-und-0-value').val() );
    }

    var cityStateZip = "";
    j('#edit-profile-main-field-city-state-zip-pvt-und-0-value').val( j('#edit-profile-main-field-city-und-0-value').val() );

    j('#edit-profile-main-field-state-pvt-und').val( j('#edit-profile-main-field-state-und').val() );

    j('#edit-profile-main-field-zip-code-pvt-und-0-value').val( j('#edit-profile-main-field-zip-und-0-value').val() );

    j('#edit-profile-main-field-phone-number-pvt-und-0-value').val( j('#edit-profile-main-field-phone-number-und-0-value').val() );
    j('#edit-profile-main-field-fax-number-pvt-und-0-value').val( j('#edit-profile-main-field-fax-number-und-0-value').val() );
    j('#edit-profile-main-field-email-pvt-und-0-email').val( j('#edit-profile-main-field-email-und-0-email').val() );
    if (pagetype != "existing") {
      j('#edit-mail').val( j('#edit-profile-main-field-email-und-0-email').val() );
    }

    j('#edit-profile-main-field-listserv-email-und-0-email').val( j('#edit-profile-main-field-email-und-0-email').val() );
 } // function copyContactInfo

function modifyProfileSection() {
  var $ = jQuery.noConflict();

  //add Bookmark anchor link to Private Contact Info subsection of profile
  var Bookmark = '<a name="PrivateContactInfo"></a>';
  $(Bookmark).insertBefore('#profile2_main_form_group_contact_info1');

  //establish generic preface for directory fieldset
  var DirectoryPreface = '<div class="registration-description">If you wish to be listed in our public directory, please complete the fields below. Only fields with information will be displayed. Optionally, you may also list a <a href="#SecondaryContactInfo">secondary organization/contact listing </a> in the section below.</div>';
  $(DirectoryPreface).insertBefore('#edit-profile-main-field-member-display-name');

  //establish generic preface for private contact info fieldset
  DirectoryPreface = '<div class="registration-description"><p>Please complete the fields below. Required fields are marked with an asterisk. If your contact info is almost the same as your directory listing above, click the copy contact info button to for quicker editing.';
  DirectoryPreface += '<a class="faux-button" onClick="copyContactInfo()" href="#SecondaryContactInfo">Copy Contact Info From Above</a></p>';
  DirectoryPreface += '</div>';
  $(DirectoryPreface).insertBefore('#profile-main-field-professional-title-pvt-add-more-wrapper');

  //dynamic columnizer of specialties
  var optionCount = $('#edit-profile-main-field-specialties-und').children().size();
  if(optionCount > 10)
  {
    var halfOptionCount = optionCount/2;

    var html = $('#edit-profile-main-field-specialties-und').html();
    var firsthalf = "";
    var secondhalf = html;
    var indice = 0;
    var indice2 = 0;

    for(i=0; i < halfOptionCount; i++)
    {
      indice = secondhalf.indexOf('</div>');
      secondhalf = secondhalf.substr(indice + 6);
    }
    indice2 = html.indexOf(secondhalf);
    firsthalf = html.substr(0,indice2);

    firsthalf = '<div style="width:35%;float:left;display:block;">' + "\n" + firsthalf + "\n" + '</div>';
    secondhalf = '<div style="width:35%;float:left;display:block;">' + "\n" + secondhalf + "\n" + '</div>';

    $('#edit-profile-main-field-specialties-und').html(firsthalf + secondhalf);
  } // end dynamic columnizer

  var descriptionHTML = $('.form-item-profile-main-field-specialties-und > .description').html();
  $('.form-item-profile-main-field-specialties-und > .description').remove();
  descriptionHTML = '<div class="description preface">' + descriptionHTML + '</div>';
  $(descriptionHTML).insertBefore('#edit-profile-main-field-specialties-und');

  $('#edit-profile-main-field-listserv-und > div:first').css({ 'visibility':'hidden','display':'none' });
  var yesHTML = '<div class="form-item form-type-radio form-item-profile-main-field-listserv-und">' + "\n";
  yesHTML += '<input type="radio" id="edit-profile-main-field-listserv-und-1" name="profile_main[field_listserv][und]" value="1" class="form-radio">' + "\n";
  yesHTML += '<label class="option" for="edit-profile-main-field-listserv-und-1">Yes </label>' + "\n";
  yesHTML += '</div>;'
  $(yesHTML).insertAfter($('#edit-profile-main-field-listserv-und > div:first'));
  $('#edit-profile-main-field-listserv-und > div:last').remove();

} //function modifyProfileSection()