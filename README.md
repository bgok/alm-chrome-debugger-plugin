alm-chrome-debugger-plugin
==========================

A Chrome plugin that adds a tab to the debugger. The tab shows various information about a page that is of interest to an ALM developer.

Targeted Features
=================
- Port the existing Client Metrics Tree scriptlet to a tab. (in-progress)
- Show messages published with MessageBus.publish().
- Show subscribers to messages.
- Lists applications, modules and components on a page.
- Submit this extension to the Chrome Webstore so the updates can be pushed automatically.

Installation
============
1. Fork this repository to the localhost where you run Chrome.
2. In Chrome, load the extension manager (chrome://chrome/extensions/).
3. Check the developer mode checkbox.
4. Click "Load unpacked extension...". Navigate to the local git repository.