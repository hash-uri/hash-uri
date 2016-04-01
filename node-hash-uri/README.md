node-hash-uri
=============

node-hash-uri is a Node.js and io.js module to produce and parse URIs with the `hash:` scheme. Hash URIs are useful for identifying resources by their content (content addressing). For more information about hash URIs in general, please see the specification [here](https://github.com/hash-uri/hash-uri).

**Usage:**

```
var hashuri = require("hash-uri");

var obj = hashuri.parse("hash://sha256/abcd?type=text/html#anchor");
console.log(obj);
/* {
	algo: "sha256",
	hash: "abcd",
	query: "?type=text/html",
	fragment: "#anchor"
	data: new Buffer("abcd", "hex"),
	encoding: "hex",
} */

var uri = hashuri.format(obj);
console.log(uri);
// Original URI is printed
```

Parsed fields and format parameters:

- `algo` (e.g. `"sha256"`)
- `hash` (string)
- `query` (can be null)
- `fragment` (can be null)
- `data` (buffer)
- `encoding` (`"hex"` only, for now)

When formatting, `hash` takes precedence over `data`.

License: MIT

