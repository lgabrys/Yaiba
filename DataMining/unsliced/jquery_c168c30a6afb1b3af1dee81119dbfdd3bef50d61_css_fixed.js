(function( jQuery ) {

var ralpha = /alpha\([^)]*\)/,
	ropacity = /opacity=([^)]*)/,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	// cache check for defaultView.getComputedStyle
	getComputedStyle = document.defaultView && document.defaultView.getComputedStyle,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return jQuery.css( elem, name, value );
	});
};

jQuery.extend({
	cssHooks: {
		opacity: {
			get: function( elem ) {
				// We should always get a number back from opacity
				var ret = curCSS( elem, "opacity", "opacity" );
				return ret === "" ? "1" : ret;
			}
		}
	},

	// exclude the following css properties to add px
	cssNumber: {
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	},

	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	css: function( elem, name, value, force, extra ) {
		// don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		var ret, origName = name.replace( rdashAlpha, fcamelCase ),
			style = elem.style || {}, hooks = jQuery.cssHooks[ origName ] || {};

		name = jQuery.cssProps[ origName ] || origName;

		if ( value !== undefined ) {
			if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			if ( !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			if ( !force && "get" in hooks && (ret = hooks.get( elem, force, extra )) !== undefined ) {
				return ret;

			} else if ( !force && style[ name ] ) {
				ret = style[ name ];

			} else if ( curCSS ) {
				ret = curCSS( elem, name, origName );
			}

			return ret;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, force, extra ) {
			var val;

			if ( elem.offsetWidth !== 0 ) {
				val = getWH( elem, name, extra );

			} else {
				jQuery.swap( elem, cssShow, function() {
					val = getWH( elem, name, extra );
				});
			}

			return val + "px";
		},

		set: function( elem, value ) {
			// ignore negative width and height values #1599
			return Math.max( parseFloat(value), 0 ) + "px";
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, force ) {
			// IE uses filters for opacity
			return ropacity.test(elem.currentStyle.filter || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				"1";
		},

		set: function( elem, value ) {
			var style = elem.style;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = parseInt( value, 10 ) + "" === "NaN" ?
				"" :
				"alpha(opacity=" + value * 100 + ")";

			var filter = style.filter || jQuery.css( elem, "filter" ) || "";

			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				opacity;
		}
	};
}

if ( getComputedStyle ) {
	curCSS = function( elem, newName, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
		}

		return ret;
	};

} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft, ret = elem.currentStyle[ name ], style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			elem.runtimeStyle.left = elem.currentStyle.left;
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			elem.runtimeStyle.left = rsLeft;
		}

		return ret;
	};
}

function getWH( elem, name, extra ) {
	var which = name === "width" ? cssWidth : cssHeight,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

	if ( extra === "border" ) {
		return val;
	}

	jQuery.each( which, function() {
		if ( !extra ) {
			val -= parseFloat(jQuery.css( elem, "padding" + this, undefined, true )) || 0;
		}

		if ( extra === "margin" ) {
			val += parseFloat(jQuery.css( elem, "margin" + this, undefined, true )) || 0;

		} else {
			val -= parseFloat(jQuery.css( elem, "border" + this + "Width", undefined, true )) || 0;
		}
	});

	return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth, height = elem.offsetHeight,
			skip = elem.nodeName.toLowerCase() === "tr";

		return width === 0 && height === 0 && !skip ?
			true :
			width > 0 && height > 0 && !skip ?
				false :
				jQuery.css(elem, "display") === "none";
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

})( jQuery );
