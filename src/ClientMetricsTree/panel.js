(function () {
    window.log = function (msg) {
        var logItem = $('<tr class="log-item">' +
            '<td class="description-column">' + msg.eDesc + '</td>' +
            '<td class="status-column">' + msg.status + '</td>' +
            '<td class="elapsed-column">' + (msg.stop - msg.start) + '</td>' +
            '<td class="event-id-column">' + msg.eId + '</td>' +
            '<td class="parent-id-column">' + msg.pId + '</td>' +
            '<td class="trace-id-column">' + msg.tId + '</td>' +
            '<td class="bts-column">' + msg.bts + '</td>' +
            '</tr>');
        logItem.on('click', getShowEventDetailFunction(msg))
        $('#event-log').append(logItem);
    };

    function getShowEventDetailFunction(msg) {
        return function (e) {

            console.log(getToolTip(msg).html());
        }
    }

    function getToolTip(msg) {
        tooltip = $('<table class="tooltip"><tbody/></table>');
        tableContents = $("table tbody", tooltip);

        for (var key in msg) {
            tableContents.append('<tr><td>' + key + '</td><td>' + msg[key] + '</td></tr>');
        }

        return tooltip;
    }
})();
