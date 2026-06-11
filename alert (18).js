<!-- SUB alert — StreamElements AlertBox custom HTML
     {{name}} = subscriber username
     {{amount}} = months subscribed (e.g. "3")
     Edit data-kind / data-sub freely.
     Examples:
       data-sub="{{amount}} months on the schmitty pack"
       data-sub="gifted by {{gifted_by}}"  (resub gift) -->
<div id="alertroot" data-side="left">
  <div id="fxlayer"></div>
  <div id="alerthost"
       data-kind="NEW SUBSCRIBER"
       data-name="{{name}}"
       data-sub="on the schmitty pack"></div>
</div>
