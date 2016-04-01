Hash URI Specification (Initial Draft)
======================================

Last updated 2016-03-31
Ben Trask

This document supercedes the informal description of hash URIs [here](https://bentrask.com/?q=hash://sha256/98493caa8b37eaa26343bbf73f232597a3ccda20498563327a4c3713821df892).

Motivation and use
------------------

The goals of content addressing in general:

- Universally agreeable identifiers across remote systems and even offline
- "Unbreakable" references to documents
- Recursive references form a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), meaning the entire document set is fully specified by the address of a single root document
- Cryptographically secure addresses that cannot be redirected or forged

Hashes are _universally agreeable_, meaning that "good collisions" will happen naturally, when the referenced content is the same. UUIDs are, as the name says, universally unique, which means that the same document might be assigned multiple different names, especially in a decentralized network or when working offline.

The goals of this particular syntax:

- Allow content addresses to be used anywhere existing links would be
- Complimentary to `http:` URLs (_not_ a replacement)
- Familiar syntax
- Easily recognized/parsed by existing software (e.g. text editors)
- Hash agility to add support for new hash algorithms
- Backward compatibility to avoid breaking old links
- Support both short hashes that are easier to type and long hashes that are highly secure
- Multiple encodings, so users can use existing hashes without conversion
- Possible future support for "fuzzy" or "semantic" hashes
- Only content addresses are supported, not "names" or other "unique identifiers"

Why name the scheme `hash:`? The most obvious alternative is `content:`, however that sounds like the URI _contains_ the content (like `data:`). Other options like `content-address:` are too long and redundant (of _course_ it's an address). What's more, all content addresses are some type of hash, and all hash references can be used as content addresses. Thus **the term "hash" has perfect specificity, neither excluding valid identifiers nor including invalid identifiers.**

Content addresses are somewhat unique in that they inherently support many resolvers and resolution methods. Thus it makes sense that the content address format should not be tied to any particular resolver or brand name. **"Hash" is a neutral term that doesn't favor any one project.**

Using the algorithm names themselves as schemes [has been proposed](https://joearms.github.io/2015/03/12/The_web_of_names.html), but it does not make much sense for applications to only register a single algorithm at a time. Having a large number of separate schemes could make it difficult for users to assign a single application to resolve all content addresses. Thus having an umbrella scheme is useful.

Syntax
------

The hash URI scheme follows [RFC 3986](https://tools.ietf.org/html/rfc3986).

```
 hash://sha256/9f86d081884c7d659a2feaa0?type=text/plain#top
 \__/   \____/ \______________________/ \_____________/ \_/
  |       |               |                    |         |
scheme algorithm         hash                query    fragment
```

Scheme: The fixed string "hash".

Algorithm: A hash algorithm name, in the form of a pseudo-DNS name. Acceptable characters are alpha-numerics, `.` (period) and `-` (hyphen). Dotted segments must have at least one character and cannot begin or end with hyphens.

Hash: The hash of the resource, using the given algorithm. Currently must be encoded in hexadecimal (base-64 support is planned). Can be truncated to any non-zero number of characters, although this may lead to ambiguity in resolvers. Hex encoding is case-insensitive but other encodings may be case-sensitive.

Query: Query parameters, which are interpreted by the resolver. Since a hash URI can be resolved by different systems, query parameters must be semi-standardized.

Fragment: Indicates a sub-resource, if any.

Appendix: Alternate content addressing schemes
----------------------------------------------

The hash URI scheme is intended to address perceived flaws in other content address formats.

**URNs**  
- No content hash URN type was ever [registered](https://www.iana.org/assignments/urn-namespaces/urn-namespaces.xhtml).
- All standard URN types (such as `urn:isbn:`) are not content hashes and cannot be feasibly supported by a purely content addressing system.
- Popular applications like BitTorrent use their own proprietary URN types (e.g. `urn:btih:`).
- Most hash URNs are "salted" with application-specific meta-data, making them unusable by other applications.
- The URN definition procedure is particularly onerous, [requiring](https://tools.ietf.org/html/rfc3406#section-4.2) new algorithms to use numbered identifiers until formally registered.
- Most systems using URN addresses wrap them in magnet links, adding another layer of complexity.

**Magnet links**  
Magnet links typically wrap URNs, and thus have all of the same downsides, plus additional complexity. The flexibility of magnet links may be useful for some applications, and hash URIs can be used in magnet links if desired.

**IPFS paths**  
IPFS paths are paths, not URLs, which makes it harder to use them with other applications such as text editors that automatically recognize URLs but not paths. URIs also support more features like query parameters and fragments, and have more consistent encoding for non-standard characters than paths. The MultiHash encoding is not as human-friendly, although it's shorter than spelling out the algorithm name. Adding new algorithms requires strictly coordinated assignment of identifiers to prevent collisions, whereas algorithm names are less likely to collide and are more amenable to "rough consensus."

**RFC 6920 (`ni:`)**  
Uses uncommon URI syntax that could break many parsers (`;` path arguments). The "ni" (Named Info) term is less meaningful and overlaps with URNs (Uniform Resource Names), which could potentially lead to use for non-content addresses.

**Bare hashes**  
Bare hashes require an externally imposed algorithm choice, which impinges hash agility.

**Algorithm-prefixed hashes**  
Simple algorithm prefixes (like "sha256-") do not form valid URLs.

Because content addresses can be resolved in many ways, applications are encouraged to support as many address formats as possible (when they aren't "salted" or overly application-specific).

Compatible Applications
-----------------------

- [StrongLink](https://github.com/btrask/stronglink)
- To be continued...

Implementations
---------------

- [node-hash-uri](https://github.com/hash-uri/hash-uri/tree/master/node-hash-uri) (Node.js, MIT licensed)

