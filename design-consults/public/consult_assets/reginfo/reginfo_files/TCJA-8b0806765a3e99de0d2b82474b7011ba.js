function setTCJA(){
    var isTCJAPageWithStar = false;
    var isTCJAPageNoStar = false;

    $(".TCJATitle").each(function( index ) {
        if( $(this).html().indexOf("[TCJA*]") >= 0){
            isTCJAPageWithStar = true;
        }

        if( $(this).html().indexOf("[TCJA]") >= 0){
            isTCJAPageNoStar = true;
        }
    });

    var hasTwoAsterisks = false;

    if ( $(".asterisk").length ) {
        hasTwoAsterisks = true;
    }

    var denotation =  buildDenotation(isTCJAPageWithStar, isTCJAPageNoStar, hasTwoAsterisks);

    $(".note").html(denotation);
}

function buildDenotation(isTCJAPageWithStar, isTCJAPageNoStar, hasTwoAsterisks){

    var denotation = '';
    var noteCount = 0;
    if(!isTCJAPageWithStar && !isTCJAPageNoStar && !hasTwoAsterisks) return denotation;
    else {
        denotation = '<label class="columnTitle"><u>Note:</u></label>';
    }
   
    if(isTCJAPageNoStar) {
        denotation += '<div class= "columnContent"> "[TCJA]" indicates a Tax Cuts and Jobs Act [Pub. L. 115-97] regulatory action.</div>';
        noteCount++;
    }
    
    if(isTCJAPageWithStar) {
    	if(noteCount > 0) denotation += '<label class="columnTitle">&nbsp;</label>';
        denotation += '<div class= "columnContent">"[TCJA*]" indicates a Tax Cuts and Jobs Act [Pub. L. 115-97] regulatory action designated for expedited review under Section 4(b) of the ';
        denotation += '<a class="pageSubNavTxt" href="/public/reginfo/leaveregs.myjsp?toi=178">Memorandum of Agreement: The Department of Treasury and the Office of Management and Budget Review of Tax Regulations under Executive Order 12866</a>.</div>';
        noteCount++;
    }

    if(hasTwoAsterisks){
        if(noteCount > 0) denotation += '<label class="columnTitle">&nbsp;</label>';
        denotation +=  '<div class= "columnContent">"**" denotes recent change in status.</div>';
    }

    denotation += '<span class="clear"></span>';

    return denotation;
}
$(document).ready(function() {
    setTCJA();
});