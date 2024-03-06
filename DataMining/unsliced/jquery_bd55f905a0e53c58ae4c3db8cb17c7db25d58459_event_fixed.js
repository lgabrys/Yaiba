(function( jQuery ) {

var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspaces = / /g,
	rescape = /[^\w\s.|`]/g,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack =  /\bhover(\.\S+)?/,
	rquickIs = /^([\w\-]+)?(?:#([\w\-]+))?(?:\.([\w\-]+))?(?:\[([\w+\-]+)=["']?([\w\-]*)["']?\])?(?::(first-child|last-child|empty))?$/,
	quickPseudoMap = {
		"empty": "firstChild",
		"first-child": "previousSibling",
		"last-child": "nextSibling"
	},
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3      4         5          6
			// [ _, tag, id, class, attrName, attrValue, pseudo(:empty :first-child :last-child) ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "\\b" + quick[3] + "\\b" );
			quick[6] = quickPseudoMap[ quick[6] ];
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) && 
			(!m[2] || elem.id === m[2]) && 
			(!m[3] || m[3].test( elem.className )) &&
			(!m[4] || elem.getAttribute( m[4] ) == m[5]) &&
			(!m[6] || !elem[ m[6] ])
		);
	}
	
function useNativeMethod( event ) {
	if ( !event.isDefaultPrevented() && this[ event.type ] ) {
		this[ event.type ]();
		return false;
	}
}

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = types.replace( rhoverHack, "mouseover$1 mouseout$1" ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t]  ) || [];
			type = tns[1];
			namespaces = (tns[2] || "").split( "." ).sort();
			special = jQuery.event.special[ type ] || {};
			type = (selector? special.delegateType : special.bindType ) || type;
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data, 
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn);

			// Delegated event setup
			if ( selector ) {
				// Pre-analyze selector so we can process it quickly on event dispatch
				handleObj.quick = quickParse( selector );
				if ( !handleObj.quick && jQuery.expr.match.POS.test( selector ) ) {
					handleObj.isPositional = true;
				}
			}

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;
			
				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}
			
			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, namespaces, 
			j, events, special, handle, eventType, handleObj;
				
		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// For removal, types can be an Event object
		if ( types && types.type && types.handler ) {
			handler = types.handler;
			types = types.type;
			selector = types.selector;
		}

		// Once for each type.namespace in types; type may be omitted
		types = (types || "").replace( rhoverHack, "mouseover$1 mouseout$1" ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type  ) {
				namespaces = namespaces? "." + namespaces : "";
				for ( j in events ) {
					jQuery.event.remove( elem, j + namespaces, handler, selector );
				}
				return;
			}

			special = jQuery.event.special[ type ] || {};
			type = (selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			namespaces =  namespaces? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Only need to loop for special events or selective removal
			if ( handler || namespaces || selector || special.remove ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( !handler || handler.guid === handleObj.guid ) {
						if ( !namespaces || namespaces.test( handleObj.namespace ) ) {
							if ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) {
								eventType.splice( j--, 1 );

								if ( handleObj.selector ) {
									eventType.delegateCount--;
								}
								if ( special.remove ) {
									special.remove.call( elem, handleObj );
								}
							}
						}
					}
				}
			} else {
				// Removing all events
				eventType.length = 0;
			}

			// remove generic event handler if no more handlers exist
			if ( eventType.length === 0 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				handle = elemData.handle;
				if ( handle ) {
					handle.elem = null;
				}

				delete elemData.events;
				delete elemData.handle;

				if ( jQuery.isEmptyObject( elemData ) ) {
					jQuery.removeData( elem, undefined, true );
				}
			}
		}
	},
	
	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			exclusive, origType, cur, ontype, handle, old, special;

		if ( type.indexOf("!") >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.exclusive = exclusive;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		
		// triggerHandler() and global events don't bubble or run the default action
		if ( onlyHandlers || !elem ) {
			event.preventDefault();
			event.stopPropagation();
		}

		// Handle a global trigger
		if ( !elem ) {
			// TODO: Stop taunting the data cache; remove global events and always attach to document
			jQuery.each( jQuery.cache, function() {
				// internalKey variable is just used to make it easier to find
				// and potentially change this stuff later; currently it just
				// points to jQuery.expando
				var internalKey = jQuery.expando,
					internalCache = this[ internalKey ];
				if ( internalCache && internalCache.events && internalCache.events[ type ] ) {
					jQuery.event.trigger( event, data, internalCache.handle.elem );
				}
			});
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		event.target = elem;

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}
		origType = type;
		if ( special.bindType ) {
			type = event.type = special.bindType;
		}

		// IE doesn't like method names with a colon (#3533, #8272)
		ontype = type.indexOf(":") < 0 ? "on" + type : "";

		// Fire event on the current element, then bubble up the DOM tree
		cur = elem;
		do {
			handle = jQuery._data( cur, "handle" );

			event.currentTarget = cur;
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Trigger an inline bound script
			if ( ontype && jQuery.acceptData( cur ) && cur[ ontype ] && cur[ ontype ].apply( cur, data ) === false ) {
				event.result = false;
				event.preventDefault();
			}

			// May need to change the event type when bubbling special events
			if ( cur === elem && special.delegateType ) {
				event.type = special.delegateType;
			}

			// Bubble up to document, then to window; watch for a global parentNode or ownerDocument var (#9724)
			cur = (!cur.setInterval && cur.parentNode || cur.ownerDocument) || cur === event.target.ownerDocument && window;
		} while ( cur && !event.isPropagationStopped() );
		type = event.type = origType;

		// If nobody prevented the default action, do it now
		if ( !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.call( elem.ownerDocument, event, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction)() check here because IE6/7 fails that test.
				// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.
				try {
					if ( ontype && elem[ type ] ) {
						// Don't re-trigger an onFOO event when we call its FOO() method
						old = elem[ ontype ];

						if ( old ) {
							elem[ ontype ] = null;
						}

						jQuery.event.triggered = type;
						elem[ type ]();
					}
				} catch ( ieError ) {}

				if ( old ) {
					elem[ ontype ] = old;
				}

				jQuery.event.triggered = undefined;
			}
		}
		
		return event.result;
	},

	handle: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );
		
		var handlers = ((jQuery._data( this, "events" ) || {})[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = Array.prototype.slice.call( arguments, 0 ),
			handlerQueue = [],
			i, cur, selMatch, matches, handleObj, sel, hit, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click")  ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;
					hit = selMatch[ sel ];

					if ( handleObj.isPositional ) {
						// Since .is() does not work for positionals; see http://jsfiddle.net/eJ4yd/3/
						hit = (hit || (selMatch[ sel ] = jQuery( sel ))).index( cur ) >= 0;
					} else {
						hit = hit || hit !== false && (selMatch[ sel ] = (handleObj.quick? quickIs( cur, handleObj.quick ) : jQuery( cur ).is( sel )));
					}
					if ( hit ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}
		
		// Copy the remaining (bound) handlers in case they're changed
		handlers = handlers.slice( delegateCount );

		// Run delegates first; they may want to stop propagation beneath us
		event.delegateTarget = this;
		for ( i=0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[i];
			dispatch( matched.elem, event, matched.matches, args );
		}
		delete event.delegateTarget;

		// Run non-delegated handlers for this level
		if ( handlers.length ) {
			dispatch( this, event, handlers, args );
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target ) {
			// Fixes #1925 where srcElement might not be defined either
			event.target = event.srcElement || document;
		}

		// check if target is a textnode (safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var eventDocument = event.target.ownerDocument || document,
				doc = eventDocument.documentElement,
				body = eventDocument.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	// Deprecated, use jQuery.guid instead
	guid: 1E8,

	// Deprecated, use jQuery.proxy instead
	proxy: jQuery.proxy,

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},
		
		focus: {
			delegateType: "focusin",
			trigger: useNativeMethod
		},
		blur: {
			delegateType: "focusout",
			trigger: useNativeMethod
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

// Run jQuery handler functions; called from jQuery.event.handle
function dispatch( target, event, handlers, args ) {
	var run_all = !event.exclusive && !event.namespace,
		specialHandle = (jQuery.event.special[event.type] || {}).handle,
		j, handleObj, ret;

	event.currentTarget = target;
	for ( j = 0, l = handlers.length; j < l && !event.isImmediatePropagationStopped(); j++ ) {
		handleObj = handlers[ j ];

		// Triggered event must either 1) be non-exclusive and have no namespace, or
		// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
		if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {
		
			// Pass in a reference to the handler function itself
			// So that we can later remove it
			event.handler = handleObj.handler;
			event.data = handleObj.data;
			event.handleObj = handleObj;

			ret = (specialHandle || handleObj.handler).apply( target, args );

			if ( ret !== undefined ) {
				event.result = ret;
				if ( ret === false ) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}
	}
}

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter and mouseleave events; IE has its own native ones but
// we need to support event delegation as well so we don't use them.
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = jQuery.event.special[ fix ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				oldType, ret;

			if ( selector && related ) {
				// Delegated event; find the real relatedTarget
				related = jQuery( related ).closest( selector )[0];
			}
			if ( !related || related !== target && !jQuery.contains( target, related ) ) {
				oldType = event.type;
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = oldType;
			}
			return ret;
		}
	};
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			jQuery.event.add(this, "click._submit", function( e ) {
					var elem = e.target,
						type = jQuery.nodeName( elem, "input" ) ? elem.type : "";

						trigger( "submit", this, arguments );
				if ( (type === "submit" || type === "image") && elem.form ) {
					simulate( "submit", this, e );
				}
			});

			jQuery.event.add(this, "keypress._submit", function( e ) {
				var elem = e.target,
					type = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.type : "";

				if ( (type === "text" || type === "password") && elem.form && e.keyCode === 13 ) {
					simulate( "submit", this, e );
				}
			});
		},

		teardown: function() {
			jQuery.event.remove( this, "._submit" );
		}
	};

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

	var getVal = function( elem ) {
		var type = elem.type,
			val = elem.value;

	getVal = function( elem ) {
		var type = jQuery.nodeName( elem, "input" ) ? elem.type : "",
			val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-one" ) {
			val = elem.selectedIndex;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target,
			old, val;

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		old = jQuery._data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery._data( elem, "_change_data", val );
		}

		if ( val !== old && old != null ) {
			simulate( "change", elem,  e, true );
		}
	},

	changeFilters = {
			focusout: testChange,

			beforedeactivate: testChange,

			click: function( e ) {
			var elem = e.target,
				name = elem.nodeName.toLowerCase(),
				type = name === "input"? elem.type : "";

			if ( type === "radio" || type === "checkbox" || name === "select" ) {
					testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
			var elem = e.target,
				name = elem.nodeName.toLowerCase(),
				type = name === "input"? elem.type : "";

			if ( (e.keyCode === 13 && name !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
		// here, you can't trigger a change event, but you can store data
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery._data( elem, "_change_data", getVal(elem) );
		},

		// Update the current value if we're not re-focusing (#8157)
		focus: function( e ) {
			var elem = e.target;
			if ( elem != document.activeElement ) {
				jQuery._data( elem, "_change_data", getVal(elem) );
			}
		}
	};

	jQuery.event.special.change = {

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + "._change", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

function simulate( type, elem, event, bubble ) {
	// Piggyback on a donor event to simulate a different one.
	// Fake originalEvent to avoid donor's stopPropagation, but if the
	// simulated event prevents default then we do the same on the donor.
	var e = jQuery.extend( {}, event, { type: type, originalEvent: {} } );
	if ( bubble ) {
		jQuery.event.trigger( e, null, elem );
	} else {
		jQuery.event.handle.call( elem, e );
	}
	if ( e.isDefaultPrevented() ) {
		event.preventDefault();
	}
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0;

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( event ) {
			simulate( fix, event.target, jQuery.event.fix( event ), true );
		}
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[type], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 || types === "unload" ) {
			origFn = fn;
			fn = function( event ) {
				jQuery.event.remove( event.delegateTarget || this, event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault ) {
			// ( event )  native or jQuery.Event
			return this.off( types.type, types.handler, types.selector );
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[type] );
			}
			return this;
		}
		if ( typeof selector !== "string" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},
	
	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});

})( jQuery );

