if(!window.tree.replOnce){
window.tree.replOnce = true

window.util = window.util || {}
window.util.urle = function(s){
  // neither escape nor encodeURIComponent get '*'
  var hex = "0123456789ABCDEF"
  return [].map.call(s,function(c){ switch(true) {
    case /[a-z0-9._~-]/.test(c): return c  // Safe
    case /[ -~]/.test(c):                  // Printable
      var n = c.charCodeAt(0)
      return "%"+hex[n/16 |0]+hex[n%16]
    default: return encodeURIComponent(c)  // Control, UTF8
}}).join('')};

var send = function(str,cb){
  $.getJSON("/.repl-json",
      // "now="+Date.now()+
      "eval="+window.util.urle(str),
    cb)
}
//var receive = function(elem, 

var addRepl = function(contents,config){
  return CodeMirror.fromTextArea(
    $('<textarea>').text(contents).appendTo(addRepl.$container)[0],
    config
  )
}
addRepl.$container = null;

$.extend(CodeMirror.defaults,
  {lineNumbers:true,autofocus:true,extraKeys:{Enter: "send"}}
)
CodeMirror.commands.send = function(cm){
  var val = cm.getValue()
  if(val === "") return;
  send(val,function(res){
    var pre = $('<pre>').insertAfter(cm.display.wrapper)
    switch(Object.keys(res).join(" ")){
            case "good":
        pre[0].innerText = res.good
      break; case "bad":
        pre.addClass('error')
        pre[0].innerText = res.bad
        var latest = $('.CodeMirror').last()[0].CodeMirror
        if(latest && latest.hasFocus() && latest.getValue() === ""){
          latest.replaceRange(val,{line:0,ch:0})
        }
      break;    default: 
        throw new Error("Unknown result "+Object.keys(res))
    }
  })
  addRepl("",{autofocus:true})
}

window.tree.actions.registerComponent("repl", React.createClass({
  displayName: "repl",
  render: function(){return React.DOM.div({
    className:"repl container",
    ref:"self"
  })},
  componentDidMount: function(){
    addRepl.$container = $(this.refs.self)
    addRepl("(add 2 2)").execCommand("send")
  }
}))

}
