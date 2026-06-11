<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>bits — test</title>
<link rel="stylesheet" href="alert.css">
<style>
  html,body{height:100%;margin:0;background:#0B1018;overflow:hidden;font-family:Fredoka,sans-serif}
  #stage{position:fixed;inset:0}
  #canvas{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:center;overflow:hidden}
  #replay{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:60;font-family:Fredoka,sans-serif;
    font-weight:600;letter-spacing:.08em;color:#06090F;background:#5FA8FF;border:0;border-radius:9px;padding:9px 18px;cursor:pointer}
</style></head><body>
  <div id="stage"><div id="canvas">
    <div id="alertroot" data-side="left">
      <div id="fxlayer"></div>
      <div id="alerthost" data-kind="500 BITS" data-name="MistyMarina" data-sub="absolutely buried him"></div>
    </div>
  </div></div>
  <button id="replay">Replay bits</button>
  <script>window.SCHMITTY_IMAGE_BASE="../../assets/";</script>
  <script>
    var canvas=document.getElementById("canvas");
    function fit(){var s=Math.min(innerWidth/1920,innerHeight/1080);canvas.style.transform="translate(-50%,-50%) scale("+s+")";}
    addEventListener("resize",fit);fit();
  </script>
  <script src="alert.js"></script>
  <script>document.getElementById("replay").addEventListener("click",function(){window.__replay&&window.__replay();});</script>
</body></html>
