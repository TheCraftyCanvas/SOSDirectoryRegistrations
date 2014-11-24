/**
* SOSdirectory.js
*
*
**/

var pagetype = "";
jQuery.noConflict();
jQuery(document).ready(function($) {
    var path = document.location.pathname;
    var pagetype = "";

    if( path.indexOf('directory') > 0 )
    { pagetype = "directory"; }
    if( path.indexOf('directory/greater-philadelphia-educational-professional-locator') > 0 )
    { pagetype = "proximity-search"; /* console.log ("proximity search page detected"); */ }

    switch (pagetype) {
      case "directory":
      {
        $('address').each(function () {
            var text = $(this).html();
            var text2encode = text.replace('<p>', '');
            text2encode = text2encode.replace('</p>', '');
            var link = "<a href='http://maps.google.com/maps?q=";
                link += encodeURIComponent(text2encode);
                link += "' target='_blank'>";
                link += text + "</a>";
            $(this).html(link);
        });
        $('#edit-field-specialties-tid').val("All").attr('selected', 'selected');

        break;
      }
      case "proximity-search":
      {
        $('#edit-field-specialties-tid').val("All").attr('selected', 'selected');
        var html ="";
        html = '<label for="edit-distance-search-distance">Search Radius</label>';
        html += '\n' + '<select id="edit-distance-search-distance" name="distance[search_distance]" class="form-select">';
        html += '\n' + '<option value="5" selected="selected">5 Miles</option>';
        html += '\n' + '<option value="10">10 Miles</option>';
        html += '\n' + '<option value="20">20 Miles</option>';
        html += '\n' + '<option value="30">30 Miles</option>';
        html += '\n' + '<option value="50">50 Miles</option>';
        html += '\n' + '</select>';
        html += '\n' + '<input type="hidden" value="mile" id="edit-distance-search-units" name="distance[search_units]">';
        $("div.form-item-distance-search-distance").html(html);
        $('div.form-item-distance-search-units').remove();
        break;
      }
      default: {}
    }

  if ($.browser.msie) {
    /**
    *   select.change function
    *     changes actively displayed block division in at right sidebar on directory page
    *     compatible with:  IE 6x+
    *
    */
    $('#edit-field-specialties-tid').change(function () {
      $('.profession-definition').hide().css( { 'visibility':'hidden' , 'display':'none' } );
      var str = "";
      var termID = "";
      $("#edit-field-specialties-tid option:selected").each(function () {
        str += $(this).text() + " ";
        termID = $(this).attr('value');
      });
      if( $.browser.version.substr(0,1) > 6 ) { console.log("Select option clicked: " + str + ", termID = " + termID) };
      var divSelected = "#" + termID;
      $(divSelected).show().css( { 'visibility':'visible' , 'display':'inline-block' } );
    });
  }

  else {
     /**
    *   select.mouseover function
    *     changes actively displayed block division in at right sidebar on directory page
    *     compatible with:  Firefox ##,
    *
    */
   $('#edit-field-specialties-tid > option').mouseover(function () {
      $('.profession-definition').hide().css( { 'visibility':'hidden' , 'display':'none' } );
      var str = "";
      var termID = "";
      str += $(this).text() + " ";
      termID = $(this).attr('value');
//      console.log("Select option hovered over: " + str + ", termID = " + termID);
      var divSelected = "#" + termID;
      $(divSelected).show().css( { 'visibility':'visible' , 'display':'inline-block' } );
    });

    /**
    *   select.change function
    *     changes actively displayed block division in at right sidebar on directory page
    *     compatible with:  Google Chrome ##, Firefox ##, Opera ##, IE 7x+
    *
    */
    $('#edit-field-specialties-tid').change(function () {
      $('.profession-definition').hide().css( { 'visibility':'hidden' , 'display':'none' } );
      var str = "";
      var termID = "";
      $("#edit-field-specialties-tid option:selected").each(function () {
        str += $(this).text() + " ";
        termID = $(this).attr('value');
      });
     console.log("Select option clicked: " + str + ", termID = " + termID);
      var divSelected = "#" + termID;
      $(divSelected).show().css( { 'visibility':'visible' , 'display':'inline-block' } );
    });

    $('#edit-submit-professional-locator').click(function() {
      var selectedValue = $('#edit-distance-search-distance > option:selected').val();
      console.log("selected value is " + selectedValue);
/*
      var html ="";
      html = '<label for="edit-distance-search-distance">Search Radius</label>';
      html += '\n' + '<select id="edit-distance-search-distance" name="distance[search_distance]" class="form-select">';
      html += '\n' + '<option value="5" selected="selected">5 Miles</option>';
      html += '\n' + '<option value="10">10 Miles</option>';
      html += '\n' + '<option value="20">20 Miles</option>';
      html += '\n' + '<option value="30">30 Miles</option>';
      html += '\n' + '<option value="50">50 Miles</option>';
      html += '\n' + '</select>';
      html += '\n' + '<input type="hidden" value="mile" id="edit-distance-search-units" name="distance[search_units]">';
      $("div.form-item-distance-search-distance").html(html);
      $('div.form-item-distance-search-units').remove();
*/
    });

  }


  });