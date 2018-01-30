let jData = {};
const client = Stomp.client("ws://localhost:8011/stomp");
const currency = {"gbp": "GBP", "jpy": "JPY", "usd": "USD", "eur": "EUR", "cad": "CAD", "chf": "CHF", "aud": "AUD"};

function moveContainers(lower, upper, containerToMove, allJSONData) {
    if (!lower.name) {
        document.getElementById("resultTable").insertAdjacentElement('beforeend', containerToMove)
    } else {
        if (!upper.name) {
            document.getElementById("resultTable").insertAdjacentElement('afterbegin', containerToMove)
        } else {
            document.getElementById("resultTable").insertBefore(containerToMove, allJSONData[lower.name].container);
        }
    }
}

function getData(data) {
    let jTemp = JSON.parse(data.body);
    if (jData[jTemp.name]) {
        jData[jTemp.name].data = jTemp;
        jData[jTemp.name].bestBidText.nodeValue = jData[jTemp.name].data.bestBid.toFixed(2);
        jData[jTemp.name].bestAskText.nodeValue = jData[jTemp.name].data.bestAsk.toFixed(2);
        jData[jTemp.name].lastChangeAskText.nodeValue = jData[jTemp.name].data.lastChangeAsk.toFixed(2);
        jData[jTemp.name].lastChangeBidText.nodeValue = jData[jTemp.name].data.lastChangeBid.toFixed(2);
        if (jData[jTemp.name].sparkLine.length >= 30) {
            jData[jTemp.name].sparkLine.splice(0, 1);
        }
        jData[jTemp.name].sparkLine.push(((jData[jTemp.name].data.bestBid + jData[jTemp.name].data.bestBid)/2).toFixed(2));
        Sparkline.draw(jData[jTemp.name].sparklineSpan, jData[jTemp.name].sparkLine);
    } else {
        jData[jTemp.name] = {"data": jTemp};
        const containerDiv = document.createElement("DIV");

        const nameSpan = document.createElement("SPAN");
        nameSpan.className = "name";
        const nameText = document.createTextNode(currency[jTemp.name.substr(0, 3)] + " - " + currency[jTemp.name.substr(3, 3)]);
        nameSpan.appendChild(nameText);
        
        const bestBidSpan = document.createElement("SPAN");
        bestBidSpan.className = "bestBid";
        const bestBidText = document.createTextNode(jTemp.bestBid.toFixed(2));
        bestBidSpan.appendChild(bestBidText);

        const bestAskSpan = document.createElement("SPAN");
        bestAskSpan.className = "bestAsk";
        const bestAskText = document.createTextNode(jTemp.bestAsk.toFixed(2));
        bestAskSpan.appendChild(bestAskText);

        const lastChangeAskSpan = document.createElement("SPAN");
        lastChangeAskSpan.className = "lastChangeAsk";
        const lastChangeAskText = document.createTextNode(jTemp.lastChangeAsk.toFixed(2));
        lastChangeAskSpan.appendChild(lastChangeAskText);

        const lastChangeBidSpan = document.createElement("SPAN");
        lastChangeBidSpan.className = "lastChangeBid";
        const lastChangeBidText = document.createTextNode(jTemp.lastChangeBid.toFixed(2));
        lastChangeBidSpan.appendChild(lastChangeBidText);

        const sparklineSpan = document.createElement("SPAN");
        sparklineSpan.className = "sparkLine";

        containerDiv.appendChild(nameSpan);
        containerDiv.appendChild(bestBidSpan);
        containerDiv.appendChild(bestAskSpan);
        containerDiv.appendChild(lastChangeAskSpan);
        containerDiv.appendChild(lastChangeBidSpan);
        containerDiv.appendChild(sparklineSpan);

        jData[jTemp.name].nameText = nameText;
        jData[jTemp.name].bestBidText = bestBidText;
        jData[jTemp.name].bestAskText = bestAskText;
        jData[jTemp.name].lastChangeAskText = lastChangeAskText;
        jData[jTemp.name].lastChangeBidText = lastChangeBidText;
        jData[jTemp.name].sparklineSpan = sparklineSpan;
        
        jData[jTemp.name].container = containerDiv;
        jData[jTemp.name].sparkLine = [];
        jData[jTemp.name].sparkLine.push(((jData[jTemp.name].data.bestBid + jData[jTemp.name].data.bestBid)/2).toFixed(2));
        
        Sparkline.draw(sparklineSpan, jData[jTemp.name].sparkLine);
        document.getElementById("resultTable").appendChild(containerDiv);
    }
    console.log(jData);
    const {lower, upper, containerToMove} = calculateContainerMovement(jData, jTemp);
    moveContainers(lower, upper, containerToMove, jData);
}

function calculateContainerMovement(allJSONData, currentJSONData) {
    let upper = {};
    let lower = {};
    for (const currName in allJSONData) {
        if (allJSONData[currName].data.lastChangeBid < currentJSONData.lastChangeBid) {
            if (upper.bid) {
                if (allJSONData[currName].data.lastChangeBid > upper.bid) {
                    upper.bid = allJSONData[currName].data.lastChangeBid;
                    upper.name = allJSONData[currName].data.name;
                }
            } else {
                upper.bid = allJSONData[currName].data.lastChangeBid;
                upper.name = allJSONData[currName].data.name;
            }
        }
        if (allJSONData[currName].data.lastChangeBid > currentJSONData.lastChangeBid) {
            if (lower.bid) {
                if (allJSONData[currName].data.lastChangeBid < lower.bid) {
                    lower.bid = allJSONData[currName].data.lastChangeBid;
                    lower.name = allJSONData[currName].data.name;
                }
            } else {
                lower.bid = allJSONData[currName].data.lastChangeBid;
                lower.name = allJSONData[currName].data.name;
            }
        }
    }
    return ({lower, upper, "containerToMove": allJSONData[currentJSONData.name].container});
}

function initialite(callback) {
    client.connect({}, function() {
        if (callback)
            callback("Sussess");
    });
}
