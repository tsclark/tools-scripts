// ==UserScript==
// @name         Hide Jira Issue Add-On Fields
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Hides block that contains unwanted widgets, like "Lucidchart Diagrams" & "Qase: runs"
// @author       Tyler Clark tclark@paylocity.com
// @match        https://paylocity.atlassian.net/browse/*
// @match        https://paylocity.atlassian.net/jira/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(function(){
    addGlobalStyle('[data-testid="issue-view-ecosystem.connect.content-panel.qase.jira.cloud__qase-runs"] { display: none; }');
    addGlobalStyle('[data-testid*="issue-view-ecosystem.connect.content-panel.com.gebsun.plugins.jira.issuechecklist__issue-checklist-content-checklist-"] { display: none; }');
    addGlobalStyle('[data-testid*="issue-view-ecosystem.connect.content-panel.com.lucidchart.jira.plugins.lucid-jira__lucidchart-issue-content-panel-"] { display: none; }');
    addGlobalStyle('[data-testid*="issue-view-ecosystem.connect.content-panel.com.kretar.jira.plugin.user-story-map__planning-poker-view-"] { display: none; }');
    addGlobalStyle('[data-testid*="issue-view-ecosystem.connect.content-panel.com.kretar.jira.plugin.user-story-map__retrospective-issue-view-"] { display: none; }');
})();

/*
 * @see https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
 */
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}