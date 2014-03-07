var segSizeW = null;
var segSizeH = null;
var imgName = null;
var imgPath = null;

var img = new Image();
var imgW = null;
var imgH = null;

var wIdx = null
var hIdx = null;
$.ajax({
        url: "php/getSegment.php",
        type: "POST",
        data: {session: gup("session")},
        dataType: "text",
        success: function(d) {
           // alert(d+' in ajax success');

            dAry = d.split(",");
            imgName = dAry[0];
            imgPath = "images/" + imgName;

            segSizeW = parseInt(dAry[1]);
            segSizeH = parseInt(dAry[2]);

            wIdx = parseInt(dAry[3]);
            hIdx = parseInt(dAry[4]);

            img.src = imgPath;
        }
    });
$(document).ready(function() {
    //alert(gup("mode")+' in ready');
     if(gup("mode") != 1 && gup("mode") != 2 ){
             alert('Mode is missing..');
              $('.imgBox').hide();
             return;
        }
    //alert('hello');
    // Get the segment information
    

    // Figure out the image size
    

    $('#submit-yes').click(function() {
        //alert("YES :"+gup("mode"))
        if(gup("mode") == 2 && typeof isCompleted1 == 'undefined'){
          //  alert('in else if undefined');
            $('.imgBox').show();
            $('#imgContainer').addClass('cursor-default sensitive').text('Sensitive');
            isCompleted1 = true;
            return;
        }else if(gup("mode") != 1 && gup("mode") != 2 ){
             alert('Mode is missing..');
              return;
        }
      //  alert('got step 2');
        var sensitiveArray = [];
        var i = 0;
        
        $('#image_wrapper td').each(function() {
            i++;
            //console.log(i);
            if ($(this).hasClass('sensitive')) {
                sensitiveArray.push(i);
            }
        });

        var sensitiveArray1 = sensitiveArray.join(',');
       
        // Log 'yes' response via PHP call --> DB write
        $.ajax({
            url: "php/vote.php",
            type: "POST",
            data: {answer: "yes", session: gup("session"), wIndex: wIdx, hIndex: hIdx, sensitiveArray: sensitiveArray1},
            dataType: "text",
            success: function(d) {
                alert("Answer submitted. Thanks!");
                $("#submit-form").trigger("done");
            }
        });
    });
    $('#submit-no').click(function() {
        //alert("NO")
        //
       if(gup("mode") == 2 && typeof isCompleted1 == 'undefined'){
          //  alert('in else if undefined');
            $('.imgBox').show();
            $('#imgContainer').addClass('cursor-default').text('Not Sensitive');
            isCompleted1 = true;
            return;
        }else if(gup("mode") != 1 && gup("mode") != 2 ){
             alert('Mode is missing..');
             return;
        }
        // Log 'yes' response via PHP call --> DB write
        $.ajax({
            url: "php/vote.php",
            type: "POST",
            data: {answer: "no", session: gup("session"), wIndex: wIdx, hIndex: hIdx},
            dataType: "text",
            success: function(d) {
                alert("Answer submitted. Thanks!");
                $("#submit-form").trigger("done");
            }
        });
    });
    $('#submit-maybe').click(function() {
        //alert("maybe")
        // Log 'yes' response via PHP call --> DB write
        $.ajax({
            url: "php/vote.php",
            type: "POST",
            data: {answer: "maybe", session: gup("session"), wIndex: wIdx, hIndex: hIdx},
            dataType: "text",
            success: function(d) {
                alert("Answer submitted. Thanks!");
                $("#submit-form").trigger("done");
            }
        });
    });
});

img.onload = function() {
       // alert("Loading... in onload");
        imgW = this.width;
        imgH = this.height;
//alert('imgW:'+imgW+" imgH:"+imgH);
        // Load the image as a background and 
        $('#image_wrapper  td').css("width", segSizeW + 'px');
        $('#image_wrapper  td').css("height", segSizeH + 'px');
        //alert((-1*wIdx*segSize*wMult) + " x " + (-1*hIdx*segSize*hMult))
        //$('#image_wrapper #img img').css("background-position", (-1*wIdx*segSizeW) + "px " + (-1*hIdx*segSizeH) + "px");
        //$('#image_wrapper').css("background-position", -120 + "px " + -60 + "px");
        $('#image_wrapper #imgContainer').css({'width': segSizeW + 'px', 'height': segSizeH + 'px', 'background-position': (-1*wIdx*segSizeW) + "px " + (-1*hIdx*segSizeH) + "px"}).css('background-image', 'url(' + imgPath + ')');
       
        // When submit is clicked, log the worker's response
       // alert(typeof isCompleted1)
        if(gup("mode") == 2 && typeof isCompleted1 == 'undefined'){
            $('.imgBox').not('#imgContainer').hide();
        }else  if(gup("mode") != 1 && gup("mode") != 2 ){
             //alert('Mode is missing..');
             
        }
    }