chrome.devtools.panels.create(
  "Client Metrics Tree",
  'icons/rally-24-24.png',
  'ClientMetricsTree/panel.html',
  function(panel){
    /*panel.createStatusBarButton('testIcon_64_24.png', 'refresh selectors', false).onClicked.addListener(function() {
      alert('click: ' + e);
    });*/
    panel.onHidden.addListener(function() {
    });
    panel.onShown.addListener(function() {
    });
  }
);
