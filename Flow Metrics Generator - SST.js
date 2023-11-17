// ==UserScript==
// @name         Flow Metrics Generator - SST
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Simple tool to allow for control flow analytics to be generated from a single location
// @author       atudela
// @match        https://jira.paylocity.com/projects/SST?selectedItem=com.atlassian.jira.jira-projects-plugin:report-page
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// ==/UserScript==
let rapidView = 1395;
let projectKey = "SST";

function getFromDate() {
  // This function does not need to be edited.
  return document.getElementById("startDateInput").valueAsDate.toISOString().split("T")[0];
}

function getToDate() {
  // This function does not need to be edited.
  return document.getElementById("endDateInput").valueAsDate.toISOString().split("T")[0];
}

function returnFlowTimeLink() {
  // Copy and paste your Flow Time URL from JIRA and replace from= and to= dates in your URL with ${getFromDate()} and ${getToDate()} respectively. The end result should look like the URL below.
  return `https://jira.paylocity.com/secure/RapidBoard.jspa?rapidView={rapidView}&projectKey={projectKey}&view=reporting&chart=controlChart&days=custom&from=${getFromDate()}&to=${getToDate()}`;
}

function returnVelocityChartLink() {
  // Copy and paste your Velocity URL from JIRA and replace from= and to= dates in your URL with ${getFromDate()} and ${getToDate()} respectively. The end result should look like the URL below.
  return `https://jira.paylocity.com/secure/RapidBoard.jspa?rapidView={rapidView}&projectKey={projectKey}&view=reporting&chart=velocityChart&timeframe=${getFromDate()};${getToDate()}`;
}

function returnActiveEfficiencyLink() {
  // Copy and paste your Active Efficiency URL from JIRA and replace from= and to= dates in your URL with ${getFromDate()} and ${getToDate()} respectively. The end result should look like the URL below.
  // Also be sure to add your desired columns that you want to track as shown below.
  return `https://jira.paylocity.com/secure/RapidBoard.jspa?rapidView={rapidView}&projectKey={projectKey}&view=reporting&chart=controlChart&days=custom&from=${getFromDate()}&to=${getToDate()}&column=8040&column=8524&column=8526`;
}

function returnTotalEfficiencyLink() {
  // Copy and paste your Total Efficiency URL from JIRA and replace from= and to= dates in your URL with ${getFromDate()} and ${getToDate()} respectively. The end result should look like the URL below.
  return `https://jira.paylocity.com/secure/RapidBoard.jspa?rapidView={rapidView}&projectKey={projectKey}&view=reporting&chart=controlChart&days=custom&from=${getFromDate()}&to=${getToDate()}`;
}

// To make this tool work for generating flow diagrams for your Jira columns, you will first need to generate a diagram for the column you want manually, making sure to select custom dates.
// After that, copy the link in your address bar and paste it somewhere close for reference.
// You will need to edit the link to make it look like the one below, take note to replace the from= and to= values for the dates.
// Once your link is formatted, just make a function like the one below, and return the link in between `` (backtick) characters and thats it!
// Save the TPM file and once you go back to your All reports page and refresh, you should be able to select some dates and generate reports to your hearts desire!
// If you want to add more buttons to track different columns, just repeat this process.
// Detailed steps for this process live here: https://wiki.paylocity.com/display/VID/How+to+Use+the+Flow+Metrics+Tool

function returnMyTestLink() {
  // This function serves as a template for you to use when generating flow diagrams for your Jira columns.
  // Be sure to take your URL from JIRA and replace from= and to= dates in your URL with ${getFromDate()} and ${getToDate()} respectively. The end result should look like the URL below.
  return `https://jira.paylocity.com/secure/RapidBoard.jspa?rapidView={rapidView}&projectKey={projectKey}&view=reporting&chart=cumulativeFlowDiagram&swimlane=123456NE&column=8040&from=${getFromDate()}&to=${getToDate()}`;
}

(function () {
  "use strict";

  let container = createContainer();

  // This is for Flow Time button.
  // As of now this is the same as the Total Efficiency button, this is intentional.
  // You shouldn't need to edit this.
  let flowTimeButton = createGeneralButton("Time");
  styleButton(flowTimeButton);
  container.appendChild(flowTimeButton);

  flowTimeButton.addEventListener("click", () => {
    window.open(returnFlowTimeLink(), "_blank");
  });

  // This is for the velocity button.
  // You shouldn't need to edit this.
  let velocityChartButton = createGeneralButton("Velocity");
  styleButton(velocityChartButton);
  container.appendChild(velocityChartButton);

  velocityChartButton.addEventListener("click", () => {
    window.open(returnVelocityChartLink(), "_blank");
  });

  let efficiencyDiv = document.createElement("div");
  efficiencyDiv.style.padding = "5px";
  efficiencyDiv.style.color = "white";
  efficiencyDiv.style.fontSize = "13";
  container.appendChild(document.createElement("br"));

  let efficiencyHeader = document.createTextNode("Efficiency");

  efficiencyDiv.appendChild(efficiencyHeader);
  container.appendChild(efficiencyDiv);

  // This is for the active efficiency button.
  // You shouldn't need to edit this.
  let activeEfficiencyButton = createGeneralButton("Active Efficiency");
  styleButton(activeEfficiencyButton);
  container.appendChild(activeEfficiencyButton);

  activeEfficiencyButton.addEventListener("click", () => {
    window.open(returnActiveEfficiencyLink(), "_blank");
  });

  // This is for the total efficiency button.
  // You shouldn't need to edit this.
  let totalEfficiencyButton = createGeneralButton("Total Efficiency");
  styleButton(totalEfficiencyButton);
  container.appendChild(totalEfficiencyButton);

  totalEfficiencyButton.addEventListener("click", () => {
    window.open(returnTotalEfficiencyLink(), "_blank");
  });

  // Here is where you can start adding more buttons.
  // To start, well make a section for the buttons and add a header.
  // Uncomment lines 116 - 124 to begin.
  // let loadDiv = document.createElement("div");
  // loadDiv.style.padding = "5px";
  // loadDiv.style.color = "white";
  // loadDiv.style.fontSize = "13";
  // container.appendChild(document.createElement("br"));

  // let loadHeader = document.createTextNode("Load");
  // loadDiv.appendChild(loadHeader);
  // container.appendChild(loadDiv);

  // Now you can begin adding your buttons below this line.
  // Jump back to the wiki for the template code.


  // You should not need to edit anything below this line, unless you know what you're doing.
  // Cancel button
  // You should not need to edit this.
  container.appendChild(document.createElement("br"));
  let cancelbutton = createGeneralButton("Cancel");
  styleButton(cancelbutton);
  container.appendChild(cancelbutton);
  cancelbutton.addEventListener("click", () => {
    let modal = document.getElementById("modal");
    document.body.removeChild(modal);
  });

  // You should not need to edit this.
  function createContainer() {
    let container = document.createElement("div");
    container.style.width = "460px";
    container.style.height = "410px";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.bottom = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.margin = "auto";
    container.style.zIndex = "9999";
    container.style.display = "block";
    container.style.overflow = "auto";
    container.style.padding = "10px 0px";
    container.style.borderRadius = "10px";
    container.style.boxShadow = "0 8px 20px 0 rgba(0,0,0,0.3),0 6px 20px 0 rgba(0,0,0,0.3)";
    container.style.background = "rgba(0,0,0,0.7)";
    container.id = "modal";

    let div = document.createElement("div");
    container.appendChild(div);
    div.style.padding = "5px";
    div.style.color = "white";

    let startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.id = "startDateInput";
    styleDatePickers(startDateInput);
    startDateInput.onchange = () => {
      let date = new Date(document.getElementById("startDateInput").value);
      date.setDate(date.getDate());
      document.getElementById("startDateInput").valueAsDate = date;
    };

    div.appendChild(document.createTextNode("Enter a start date for control chart report generation"));
    div.appendChild(document.createElement("br"));
    div.appendChild(startDateInput);

    let endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.id = "endDateInput";
    styleDatePickers(endDateInput);
    endDateInput.onchange = () => {
      let date = new Date(document.getElementById("endDateInput").value);
      date.setDate(date.getDate());
      document.getElementById("endDateInput").valueAsDate = date;
    };

    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode("Enter an end date for control chart report generation"));
    div.appendChild(document.createElement("br"));
    div.appendChild(endDateInput);

    document.body.appendChild(container);

    return container;
  }

  function createGeneralButton(name) {
    let button = document.createElement("BUTTON");
    let text = document.createTextNode(name);
    button.appendChild(text);
    return button;
  }

  function styleButton(button) {
    button.style.top = "10px";
    button.style.left = "10px";
    button.style.zIndex = "999999";
    button.style.color = "#FFF";
    button.style.backgroundColor = "rgb(0, 125, 255)";
    button.style.boxShadow = "inset 0 1px 0 #66bfff";
    button.style.border = "none";
    button.style.borderRadius = "2px";
    button.style.padding = "5px";
    button.style.margin = "10px";
    button.style.display = "inline-block";
    button.style.fontSize = "90%";
    button.style.width = "150px";
  }

  function styleDatePickers(date) {
    date.style.display = "inline-block";
    date.style.width = "98.75%";
    date.style.height = "20px";
    date.style.fontSize = "12px";
    date.style.color = "555555";
    date.style.backgroundColor = "#fff";
    date.style.border = "1px solid #ccc";
    date.style.borderRadius = "4px";
    date.style.position = "center";
  }
})();