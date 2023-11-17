// ==UserScript==
// @name                Calculate Hours
// @include     https://paylocity.atlassian.net*
// @namespace   http://toomasr.com/
// @version             0.2
// @description Shows the total of hours in the footer, including custom fields and jira dashboards
// @copyright   2014+, Toomas Römer
// @author    Toomas Römer
// @modifiedByAuthor    Robbie Falck & Tyler Clark
// ==/UserScript==
"use strict";

jQuery(document).ready(function() {
    // Perform initial calculation on page load.
    addTotalFooterJQL();
    addTotalFooterDashboard();

    // Monitor .navigator-content for changes.
    // When #issuetable is rewritten, recalculate estimates footer.
    var oldTable = jQuery("#issuetable").get(0);
    jQuery(".navigator-content").bind('DOMSubtreeModified', function(e) {
        var newTable = jQuery("#issuetable").get(0);
        if (newTable !== oldTable) {
            oldTable = newTable;
            addTotalFooterJQL();
        }
    });
});

function addTotalFooterJQL() {
    // Clone last row and clean it from content
    var resultRow = jQuery("#issuetable");
    var resultLastRow = resultRow.find(".issuerow:last").clone();
    resultLastRow.find("td").html("");
    // Calculate sums for the estimate columns
    //resultLastRow.find(".timeoriginalestimate").html(formatEstimate(sumMinutes(resultRow.find(".timeoriginalestimate"))));
    resultLastRow.find(".customfield_10034").html(sumTotal(resultRow.find(".customfield_10034")));


    var footer = jQuery("<tfoot></tfoot>").append(resultLastRow);
    jQuery("#issuetable").append(footer);
}

function addTotalFooterDashboard() {
    // Clone last row and clean it from content for each table
    var tables = jQuery(".issue-table");

    for (var i = 0; i < tables.length; i++)
    {
        // Clone last row and clean it from content
        var resultRow = jQuery(".issue-table").eq(i);
        var resultLastRow = resultRow.find(".issuerow:last").clone();
        resultLastRow.find("td").html("");
        // Calculate sums for the estimate columns
        //resultLastRow.find(".timeoriginalestimate").html(formatEstimate(sumMinutes(resultRow.find(".timeoriginalestimate"))));
        resultLastRow.find(".customfield_10034").html(sumTotal(resultRow.find(".customfield_10034")));


        var footer = jQuery("<tfoot></tfoot>").append(resultLastRow);
        jQuery(".issue-table").eq(i).append(footer);
    }
}



function formatEstimate(minutes) {
    if (minutes < 60) {
        return minutes + " minutes";
    }

    var hours = minutes / 60;
    return roundTo(hours, 1) + " hours";
}

function roundTo(number, decimals) {
    var pow = Math.pow(10, decimals);
    return Math.round(number*pow) / pow;
}

function sumMinutes(field) {
    var minutes = 0;
    field.each(function(key,val) {
        var time = jQuery(val).text();
        if (time) {
            minutes += parseToMinutes(time);
        }
    });

    return minutes;
}

function sumTotal(field) {
    var total = 0;
    field.each(function(key,val) {
        var value = jQuery(val).text();
        if (value) {
            total += parseInt(value);
        }
    });

    return total;
}

function parseToMinutes(timeStr) {
    var times = timeStr.split(",") ;
    var rtrn = 0;
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var match;
        if ((match = /([0-9]+)\s*minutes?/.exec(time))) {
            rtrn+=parseInt(match[1], 10);
        }
        else if ((match = /([0-9]+)\s*hours?/.exec(time))) {
            rtrn+=parseInt(match[1]*60);
        }
        else if ((match = /([0-9]+)\s*days?/.exec(time))) {
            rtrn+=parseInt(match[1]*6*60);
        }
        else if ((match = /([0-9]+)\s*weeks?/.exec(time))) {
            rtrn+=parseInt(match[1]*6*60*5);
        }
        else {
            throw ("The string didn't match" + timeStr);
        }
    }
    return rtrn;
}