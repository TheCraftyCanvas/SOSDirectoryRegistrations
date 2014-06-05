<article id="article-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="article-inner sos-program">

    <?php print $unpublished; ?>

    <?php print render($title_prefix); ?>
    <?php if ($title || $display_submitted): ?>
      <header>
        <?php if ($title): ?>
          <h1<?php print $title_attributes; ?>>
            <a href="<?php print $node_url; ?>" rel="bookmark"><?php print $title; ?></a>
          </h1>
        <?php endif; ?>
      </header>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <div<?php print $content_attributes; ?>>

    <?php print render($content['body']);?>

    <div class="item-list">
      <ul>
      <?php foreach($content['field_presenter'] as $k => $v) : ?>
          <?php if(is_numeric($k)) : ?>
            <li>
              <?php print render($v) ?>
            </li>
          <?php endif ?>
      <?php endforeach ?>
      </ul>
    </div><!--/.item-list-->
      </br>
      <h4 class="views-label views-label-field-agenda scheduling-notes-heading">Scheduling Notes/Agenda: </h4>

<?php

      print render($content['field_date_time']);

      print '<p>' . render($content['field_agenda']) . '</p>';

      print render($content['field_flyer']);

      print '<br/><address>' . "\n";
      print render($content['field_location_url']);
      print render($content['field_event_location_b']);
      print render($content['field_event_location_c']);
      print '</address>' . "\n";
?>
      </br>

<?php

/* extract the starting date of the event and test to see if it is in the future or in the past */
$field_name='field_date_time';
$items = field_get_items('node', $node, $field_name);
$field = field_info_field($field_name);
$instance = field_info_instance('node', $field_name, $node->type);
$item=$items[0]; //Just display the first date
$startDate = $item['value'];

if( strtotime($startDate) > date(DATE_ATOM) ) : ?>
  <?php 
    print '<div class="program-registration-form">';
    print '<h2>Register Now and Reserve Your Spot</h2>';
    webform_node_view($node,'full');
    print theme_webform_view($node->content);
  ?>

  <?php foreach($content['field_ce_credits'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="ce-credits" class="program-registration-options">
      <?php print render($content['field_paypal_code_ce_cred']); ?>
      <?php print render($content['field_ce_credits_description']); ?>
      </div><!--/#ce-credits-->
  <?php endif; } } ?>

  <?php foreach($content['field_act_48_credits'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="act48-credits" class="program-registration-options">
      <?php print render($content['field_paypal_code_act_cred']); ?>      
      <?php print render($content['field_act_credits_description']); ?>      
      </div><!--/#act48-credits-->
  <?php endif; } } ?>

  <?php foreach($content['field_nonmembers_welcome'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="nonmember-reg" class="program-registration-options">
      <?php print render($content['field_paypal_code_nonmembers']); ?>
      <?php print render($content['field_nonmembers_description']); ?>
      </div><!--/#nonmember-reg-->
  <?php endif; } } ?>
  <?php print '</div><!--/#program-registration-form-->'; ?>
  
<?php else: ?>

  <?php foreach($content['field_ce_credits'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="ce-credits" class="program-registration-options">
      <h4>CE Credits were available for this event.</h4>
      </div><!--/#ce-credits-->
  <?php endif; } } ?>

  <?php foreach($content['field_act_48_credits'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="act48-credits" class="program-registration-options">
      <h4>ACT48 Credits were available for this event.</h4>
      </div><!--/#act48-credits-->
  <?php endif; } } ?>

  <?php foreach($content['field_nonmembers_welcome'] as $k => $v) {
    if(is_numeric($k)) { if(render($v) == 'Yes') : ?>
      <div id="nonmember-reg" class="program-registration-options">
      <h4>Non-members were welcome to register for this event.</h4>
      </div><!--/#nonmember-reg-->
  <?php endif; } } ?>

  <?php
  /* print historical archives for program if they exist */
  if($content['field_archived_handouts']) {
    print render($content['field_archived_handouts']);
  }
  if($content['field_archives']) {
    print render($content['field_archives']);
  }
  else {
    print '<div id="event-handouts">Sorry, no materials for this program have been archived on the website."</div>';
  }
  ?>
<?php endif; ?>



    </div><!--/.article-content-->


    <?php if (!empty($content['links'])): ?>
      <nav class="clearfix"><?php print render($content['links']); ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>

  </div><!--/.sos-program-->
</article>
