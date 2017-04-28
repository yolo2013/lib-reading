define( function() {
	"use strict";

	// Match a standalone tag
	/// 匹配一个独立的标签
	return ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
} );
