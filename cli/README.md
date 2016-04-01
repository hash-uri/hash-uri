hash-uri (command line tool)
============================

`hash-uri` is a simple command line tool for computing and verifying [hash URIs](https://github.com/hash-uri/hash-uri).

**Usage**

```
$ hash-uri /path/to/file
hash://sha256/e19b36599e4d6759291f32128986805f76a778249fede779f26ad578176ebfa4
hash://sha512/01f0946c1535acb7d49b4c7d50953cbb1941bfaaee698f3ae83a95308cec1242739b176e5e8e01dce1af347c5051a34c1c69ce05c848372f83ae830982959b94
hash://sha1/ecf1ed0f5a10707b13940554ac9c514bce431d03
hash://md5/a6535c52841993dbd39b134ae33ab9e8

$ hash-uri /path/to/file --verify hash://sha256/e19b36599e4d6759291f32128986805f76a778249fede779f26ad578176ebfa4
hash://sha256/e19b36599e4d6759291f32128986805f76a778249fede779f26ad578176ebfa4
# Quiet on success
# Exit status 0

$ hash-uri /path/to/file --verify hash://sha256/000000
hash://sha256/e19b36599e4d6759291f32128986805f76a778249fede779f26ad578176ebfa4
Error: Hash mismatch!
# Exit status 102 (mnemonic: 1 is not 2!)
```

MIT license
