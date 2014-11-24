<div class="sos-application"><?php echo $rendered_user; ?></div>

<script language="JavaScript">

jQuery(document).ready(function($){
  var path = document.location.pathname;
  var index = -1;
  
  //swap order of form, move profile before generic Drupal user registration
  $('#edit-profile-main').insertBefore('#edit-account');

  //add Bookmark anchor link to Private Contact Info subsection of profile
  var Bookmark = '<a name="PrivateContactInfo"></a>';
  $(Bookmark).insertBefore('#profile2_main_form_group_contact_info1');
  
  //establish generic preface for directory fieldset
  var DirectoryPreface = '<p class="instructions">If you wish to be listed in our public directory, please complete the fields below. Only fields with information will be displayed. Otherwise, skip to the <a href="#PrivateContactInfo">PRIVATE CONTACT INFO</a> section below.</p>';
  $(DirectoryPreface).insertBefore('#edit-profile-main-field-member-display-name');

//  $('<div id="col1">').insertBefore('.form-item-profile-main-field-specialties-und-13');
//  $('</div><div id="col2">').insertAfter('.form-item-profile-main-field-specialties-und-27');
//  $('</div>').insertAfter('.form-item-profile-main-field-specialties-und-49');

  var DrupalAccountPreface = '<p class="instructions">In order to proceed with your application, you will need to register a username and email address. This account is required to update your information, renew membership, and take advantage of other SOS online member-only resources.</p>';
  $(DrupalAccountPreface).insertBefore('#edit-account > .form-item-name');
  
});

  
</script>