# repl
A stateless hoon repl.

Set `ren/repl-json/enabled` to `|` and `LOCAL` in `web/repl/main.js` to `false`
to use a tlon-hosted comet for evaluation.

The `web/` directory contents can instead be copied anywhere inside the
web-visible tree; `ren/` and `mar/` may be omitted entirely in a non-`LOCAL`
deployment.
