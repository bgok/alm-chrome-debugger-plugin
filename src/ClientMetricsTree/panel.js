window.log = function(msg) {
    $('#event-log').append('<tr>' +
        '<td class="description-column">' + msg.eDesc + '</td>' +
        '<td class="status-column">' + msg.status + '</td>' +
        '<td class="elapsed-column">' + (msg.stop - msg.start) + '</td>' +
        '<td class="event-id-column">' + msg.eId + '</td>' +
        '<td class="parent-id-column">' + msg.pId + '</td>' +
        '<td class="trace-id-column">' + msg.tId + '</td>' +
        '<td class="bts-column">' + msg.bts + '</td>' +
    '</tr>');
};

