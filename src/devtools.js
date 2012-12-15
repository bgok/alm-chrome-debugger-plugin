// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


//add new panel: 'jQuery Selector Inspector'
chrome.devtools.panels.create(
  "Client Metrics Tree",
  'icons/rally-24-24.png',
  'ClientMetricsTree/panel.html',
  function(panel){
    /*panel.createStatusBarButton('testIcon_64_24.png', 'refresh selectors', false).onClicked.addListener(function() {
      alert('click: ' + e);
    });*/
    panel.onHidden.addListener(function() {
      _.inspector.hideAll();
    });
    panel.onShown.addListener(function() {
      _.inspector.showAll();
    });
  }
);
