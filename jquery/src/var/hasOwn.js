/// 返回一个函数，判断是否是其自身属性
define( [
	"./class2type"
], function( class2type ) {
	"use strict";

	return class2type.hasOwnProperty;
} );
