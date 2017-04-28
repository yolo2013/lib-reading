// Initialize a jQuery object
/// jQuery对象的初始化从这里开始
define( [
	"../core",
	"../var/document",
	"./var/rsingleTag",

	"../traversing/findFilter"
], function( jQuery, document, rsingleTag ) {

"use strict";

// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	/// 快速检测HTML代码，以及'#'开头（也就是ID选择器）
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		/// 上面几种情况，直接返回这个函数
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		/// 如果已经传入一个顶层jQuery对象，那么直接使用传入参数，否则使用之前定义的对象
		root = root || rootjQuery;

		// Handle HTML strings
		/// 处理字符串的情况
		if ( typeof selector === "string" ) {

			/// 判断是 '<xxx>'这种形式的字符串
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				/// 否则判断是否是HTML字符串
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			/// 到这里，要么是没有指定context要么ID选择器
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				/// 处理HTML的情况
				if ( match[ 1 ] ) {
					/// 确保context是一个dom元素
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			/// 到这里，说明不是HTML字符串，处理没有传context
			/// 以及context为jQuery对象的情况
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				/// constructor指向的就是jQuery对象本身
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		/// 传入DOM元素，转为jQuery对象，并返回
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		/// 处理传入函数的情况，就是常见的写法：$(function() {})
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );

return init;

} );
