define( [
	"../core",
	"../var/document",
	"./var/rsingleTag",
	"../manipulation/buildFragment",

	// This is the only module that needs core/support
	"./support"
], function( jQuery, document, rsingleTag, buildFragment, support ) {

"use strict";

// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
/// 解析HTML
jQuery.parseHTML = function( data, context, keepScripts ) {
	/// data必须是一个字符串
	if ( typeof data !== "string" ) {
		return [];
	}

	/// 如果context是bool值，表示这段代码中是否包含script
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	/// 没有指定context，默认document
	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	/// 示例：["<a>", "a", index: 0, input: "<a>"]
	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	/// 如果是一个独立标签，直接创建一个元素，并转为数组
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};

return jQuery.parseHTML;

} );
