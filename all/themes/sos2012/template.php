<?php
// sos2012 by Adaptivethemes.com, a starter sub-sub-theme.

/**
 * Rename each function and instance of "sos2012" to match
 * your subthemes name, e.g. if you name your theme "sos2012" then the function
 * name will be "sos2012_preprocess_hook". Tip - you can search/replace
 * on "sos2012".
 */

/**
 * Override or insert variables into the html templates.
 * Replace 'sos2012' with your themes name, i.e. mytheme_preprocess_html()
 */
function sos2012_preprocess_html(&$vars) {

  // Load the media queries styles
  // If you change the names of these files they must match here - these files are
  // in the /css/ directory of your subtheme - the names must be identical!
  $media_queries_css = array(
    'sos2012.responsive.style.css',
    'sos2012.responsive.gpanels.css'
  );
  load_subtheme_media_queries($media_queries_css, 'sos2012'); // Replace 'sos2012' with your themes name

 /**
  * Load IE specific stylesheets
  * AT automates adding IE stylesheets, simply add to the array using
  * the conditional comment as the key and the stylesheet name as the value.
  *
  * See our online help: http://adaptivethemes.com/documentation/working-with-internet-explorer
  *
  * For example to add a stylesheet for IE8 only use:
  *
  *  'IE 8' => 'ie-8.css',
  *
  * Your IE CSS file must be in the /css/ directory in your subtheme.
  */
  /* -- Delete this line to add a conditional stylesheet for IE 7 or less.
  $ie_files = array(
    'lte IE 7' => 'ie-lte-7.css',
  );
  load_subtheme_ie_styles($ie_files, 'sos2012'); // Replace 'sos2012' with your themes name
  // */

}


function sos2012_theme($existing, $type, $theme, $path){
  return array(
    'user_register' => array(
      'render element' => 'form',
      'template' => 'templates/user-register',
    ),
  );
}

function sos2012_preprocess_user_register(&$variables) {
  
  $variables['rendered_user'] = drupal_render_children($variables['form']);

  }
  
  
function sos2012_hook_form_profile2_form_alter() {

}