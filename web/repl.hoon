:: ;module(nav_title "REPL", nav_no-dpad "", nav_no-sibs "")
;div.mini-module
  ;link(type "text/css", rel "stylesheet", href "//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.min.css");
  ;script@"//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.js";
  ;script@"/===/lib/js/hoon.js";
::
  ;link/"main.css"(rel "stylesheet");
  ;script@"main.js";
  ;repl;
==
