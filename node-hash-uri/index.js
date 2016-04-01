// Copyright 2014-2016 Ben Trask
// MIT licensed (see LICENSE for details)

var hashuri = exports;

function has(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

// returns: { algo: string, hash: string, query: string, fragment: string, data: buffer, encoding: string }
hashuri.parse = function(uri) {
	if("string" !== typeof uri) throw new TypeError("Invalid URI");
	// TODO: Support for other encodings...
	var x = /^hash:\/\/([\w\d.-]+)\/([0-9a-fA-F]+)(?:\?([\w\d.%+\/*=&_-]+))?(#[\w\d.%_-]+)?$/i.exec(uri);
	if(!x) return null;
	var algo = x[1];
	var hash = x[2];
	var query = x[3] || null;
	var fragment = x[4] || null;
	var encoding = "hex";
	var data = new Buffer(hash, encoding);
	return {
		algo: algo,
		hash: hash,
		query: query,
		fragment: fragment,

		data: data,
		encoding: encoding,
	};
};

// obj: { algo: string, hash: string, query: string, fragment: string, data: buffer, encoding: string }
// returns: string
hashuri.format = function(obj) {
	if(!obj.algo) return null;
	if(!obj.hash && !obj.data) return null;
	var encoding = obj.encoding || "hex";
	if("hex" !== encoding) return null;
	var hash = obj.hash || obj.data.toString(encoding);
	return "hash://"+
		obj.algo+
		"/"+hash+
		(obj.query||"")+
		(obj.fragment||"");
};

