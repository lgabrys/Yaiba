











function TreeOutline(listNode, nonFocusable)
{
    /** @type {!Array.<TreeElement>} */
    this.children = [];
    this.selectedTreeElement = null;
    this._childrenListNode = listNode;
    this.childrenListElement = this._childrenListNode;
    this._childrenListNode.removeChildren();
    this.expandTreeElementsWhenArrowing = false;
    this.root = true;
    this.hasChildren = false;
    this.expanded = true;
    this.selected = false;
    this.treeOutline = this;
    /** @type {function(TreeElement,TreeElement):number|null} */
    this.comparator = null;

    this.setFocusable(!nonFocusable);
    this._childrenListNode.addEventListener("keydown", this._treeKeyDown.bind(this), true);

    /** @type {!Map.<!Object, !Array.<!TreeElement>>} */
    this._treeElementsMap = new Map();
    /** @type {!Map.<!Object, boolean>} */
    this._expandedStateMap = new Map();
}

TreeOutline.prototype.setFocusable = function(focusable)
{
    if (focusable)
        this._childrenListNode.setAttribute("tabIndex", 0);
    else
        this._childrenListNode.removeAttribute("tabIndex");
}

/**
 * @param {TreeElement} child
 */


TreeOutline.prototype.appendChild = function(child)
{
    var insertionIndex;
    if (this.treeOutline.comparator)
        insertionIndex = insertionIndexForObjectInListSortedByFunction(child, this.children, this.treeOutline.comparator);
    else
        insertionIndex = this.children.length;
    this.insertChild(child, insertionIndex);
}

/**
 * @param {TreeElement} child
 * @param {TreeElement} beforeChild
 */



TreeOutline.prototype.insertBeforeChild = function(child, beforeChild)
{
    if (!child)
        throw("child can't be undefined or null");

    if (!beforeChild)
        throw("beforeChild can't be undefined or null");

    var childIndex = this.children.indexOf(beforeChild);
    if (childIndex === -1)
        throw("beforeChild not found in this node's children");

    this.insertChild(child, childIndex);
}

/**
 * @param {TreeElement} child
 * @param {number} index
 */



TreeOutline.prototype.insertChild = function(child, index)
{
    if (!child)
        throw("child can't be undefined or null");

    var previousChild = (index > 0 ? this.children[index - 1] : null);
    if (previousChild) {
        previousChild.nextSibling = child;
        child.previousSibling = previousChild;
    } else {
        child.previousSibling = null;
    }

    var nextChild = this.children[index];
    if (nextChild) {
        nextChild.previousSibling = child;
        child.nextSibling = nextChild;
    } else {
        child.nextSibling = null;
    }

    this.children.splice(index, 0, child);
    this.hasChildren = true;
    child.parent = this;
    child.treeOutline = this.treeOutline;
    child.treeOutline._rememberTreeElement(child);

    var current = child.children[0];
    while (current) {
        current.treeOutline = this.treeOutline;
        current.treeOutline._rememberTreeElement(current);
        current = current.traverseNextTreeElement(false, child, true);
    }

    if (child.hasChildren && typeof(child.treeOutline._expandedStateMap.get(child.representedObject)) !== "undefined")
        child.expanded = child.treeOutline._expandedStateMap.get(child.representedObject);

    if (!this._childrenListNode) {
        this._childrenListNode = this.treeOutline._childrenListNode.ownerDocument.createElement("ol");
        this._childrenListNode.parentTreeElement = this;
        this._childrenListNode.classList.add("children");
        if (this.hidden)
            this._childrenListNode.classList.add("hidden");
    }

    child._attach();
}

/**
 * @param {number} childIndex
 */


TreeOutline.prototype.removeChildAtIndex = function(childIndex)
{
    if (childIndex < 0 || childIndex >= this.children.length)
        throw("childIndex out of range");

    var child = this.children[childIndex];
    this.children.splice(childIndex, 1);

    var parent = child.parent;
    if (child.deselect()) {
        if (child.previousSibling)
            child.previousSibling.select();
        else if (child.nextSibling)
            child.nextSibling.select();
        else
            parent.select();
    }

        child.previousSibling.nextSibling = child.nextSibling;
    if (child.nextSibling)
        child.nextSibling.previousSibling = child.previousSibling;
    if (child.treeOutline) {
        child.treeOutline._forgetTreeElement(child);
        child.treeOutline._forgetChildrenRecursive(child);
    }

    child._detach();
    child.treeOutline = null;
    child.parent = null;
    child.nextSibling = null;
    child.previousSibling = null;
}

/**
 * @param {TreeElement} child
 */


TreeOutline.prototype.removeChild = function(child)
{
    if (!child)
        throw("child can't be undefined or null");

    var childIndex = this.children.indexOf(child);
    if (childIndex === -1)
        throw("child not found in this node's children");

    this.removeChildAtIndex.call(this, childIndex);
}

TreeOutline.prototype.removeChildren = function()
{
    for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i];

        if (child.treeOutline) {
            child.treeOutline._forgetTreeElement(child);
            child.treeOutline._forgetChildrenRecursive(child);
        }

        child._detach();
        child.treeOutline = null;
        child.parent = null;
        child.nextSibling = null;
        child.previousSibling = null;
    }

    this.children = [];
}
/**
 * @param {TreeElement} element
 */


TreeOutline.prototype._rememberTreeElement = function(element)
{
    if (!this._treeElementsMap.get(element.representedObject))
        this._treeElementsMap.put(element.representedObject, []);

    // check if the element is already known
    var elements = this._treeElementsMap.get(element.representedObject);
    if (elements.indexOf(element) !== -1)
        return;
    elements.push(element);
}



TreeOutline.prototype._forgetTreeElement = function(element)
{
    if (this._treeElementsMap.get(element.representedObject)) {
        var elements = this._treeElementsMap.get(element.representedObject);
            this._treeElementsMap.remove(element.representedObject);
    }
}

/**
 * @param {TreeElement} parentElement
 */

TreeOutline.prototype._forgetChildrenRecursive = function(parentElement)
{
    var child = parentElement.children[0];
    while (child) {
        child = child.traverseNextTreeElement(false, parentElement, true);
    }
}



TreeOutline.prototype.getCachedTreeElement = function(representedObject)
{
    if (!representedObject)
        return null;

    var elements = this._treeElementsMap.get(representedObject);
    if (elements && elements.length)
        return elements[0];
}

/**
 * @param {Object} representedObject
 * @return {TreeElement}
 */


TreeOutline.prototype.findTreeElement = function(representedObject, isAncestor, getParent)
{
        return null;

    var cachedElement = this.getCachedTreeElement(representedObject);
    if (cachedElement)
        return cachedElement;

    var ancestors = [];
    for (var currentObject = getParent(representedObject); currentObject;  currentObject = getParent(currentObject)) {
        ancestors.push(currentObject);
            break;
    }

    for (var i = ancestors.length - 1; i >= 0; --i) {
        var treeElement = this.getCachedTreeElement(ancestors[i]);
        if (treeElement)
            treeElement.onpopulate();  // fill the cache with the children of treeElement
    }

    return this.getCachedTreeElement(representedObject);
}




TreeOutline.prototype.treeElementFromPoint = function(x, y)
{
    var node = this._childrenListNode.ownerDocument.elementFromPoint(x, y);
    if (!node)
        return null;

    var listNode = node.enclosingNodeOrSelfWithNodeNameInArray(["ol", "li"]);
        return listNode.parentTreeElement || listNode.treeElement;
    return null;
}
TreeOutline.prototype._treeKeyDown = function(event)
{
    if (event.target !== this._childrenListNode)

    if (!this.selectedTreeElement || event.shiftKey || event.metaKey || event.ctrlKey)
        return;

    var handled = false;
    var nextSelectedElement;
    if (event.keyIdentifier === "Up" && !event.altKey) {
        nextSelectedElement = this.selectedTreeElement.traversePreviousTreeElement(true);
            nextSelectedElement = nextSelectedElement.traversePreviousTreeElement(!this.expandTreeElementsWhenArrowing);
        handled = nextSelectedElement ? true : false;
    } else if (event.keyIdentifier === "Down" && !event.altKey) {
        nextSelectedElement = this.selectedTreeElement.traverseNextTreeElement(true);
        while (nextSelectedElement && !nextSelectedElement.selectable)
            nextSelectedElement = nextSelectedElement.traverseNextTreeElement(!this.expandTreeElementsWhenArrowing);
        handled = nextSelectedElement ? true : false;
    } else if (event.keyIdentifier === "Left") {
        if (this.selectedTreeElement.expanded) {
            if (event.altKey)
                this.selectedTreeElement.collapseRecursively();
                this.selectedTreeElement.collapse();
            handled = true;
        } else if (this.selectedTreeElement.parent && !this.selectedTreeElement.parent.root) {
            handled = true;
            if (this.selectedTreeElement.parent.selectable) {
                nextSelectedElement = this.selectedTreeElement.parent;
                while (nextSelectedElement && !nextSelectedElement.selectable)
                    nextSelectedElement = nextSelectedElement.parent;
                handled = nextSelectedElement ? true : false;
            } else if (this.selectedTreeElement.parent)
        }
    } else if (event.keyIdentifier === "Right") {
        if (!this.selectedTreeElement.revealed()) {
            this.selectedTreeElement.reveal();
            handled = true;
        } else if (this.selectedTreeElement.hasChildren) {
            handled = true;
            if (this.selectedTreeElement.expanded) {
                nextSelectedElement = this.selectedTreeElement.children[0];
                    nextSelectedElement = nextSelectedElement.nextSibling;
                handled = nextSelectedElement ? true : false;
            } else {
                if (event.altKey)
                else
                    this.selectedTreeElement.expand();
            }
        }
    } else if (event.keyCode === 8 /* Backspace */ || event.keyCode === 46 /* Delete */)
        handled = this.selectedTreeElement.ondelete();
    else if (isEnterKey(event))
        handled = this.selectedTreeElement.onenter();
    else if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Space.code)
        handled = this.selectedTreeElement.onspace();

    if (nextSelectedElement) {
        nextSelectedElement.reveal();
        nextSelectedElement.select(false, true);
    }

    if (handled)
        event.consume(true);
}

TreeOutline.prototype.expand = function()
{
    // this is the root, do nothing
}

TreeOutline.prototype.collapse = function()
{
    // this is the root, do nothing
}

TreeOutline.prototype.revealed = function()
{
    return true;
}
TreeOutline.prototype.reveal = function()
{
}
TreeOutline.prototype.select = function()
{
}
/**
 * @param {boolean=} omitFocus
 */


TreeOutline.prototype.revealAndSelect = function(omitFocus)
{
    // this is the root, do nothing
}




function TreeElement(title, representedObject, hasChildren)
{
    this._title = title;
    this.representedObject = (representedObject || {});

    this._hidden = false;
    this._selectable = true;
    this.expanded = false;
    this.selected = false;
    this.hasChildren = hasChildren;
    this.children = [];
    this.treeOutline = null;
    this.parent = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this._listItemNode = null;
}

TreeElement.prototype = {
    arrowToggleWidth: 10,

    get selectable() {
    },

    set selectable(x) {
        this._selectable = x;
    },

    get listItemElement() {
        return this._listItemNode;
    },

    get childrenListElement() {
        return this._childrenListNode;
    },

    get title() {
        return this._title;
    },

    set title(x) {
        this._title = x;
        this._setListItemNodeContent();
    },
    get tooltip() {
    },

    set tooltip(x) {
        this._tooltip = x;
            this._listItemNode.title = x ? x : "";
    },

    get hasChildren() {
    },

    set hasChildren(x) {

        this._hasChildren = x;
        if (!this._listItemNode)

        if (x)
            this._listItemNode.classList.add("parent");
        else {
            this._listItemNode.classList.remove("parent");
        }
    },

    get hidden() {
    },

    set hidden(x) {
        if (this._hidden === x)
            return;

        this._hidden = x;

        if (x) {
            if (this._listItemNode)
            if (this._childrenListNode)
        } else {
            if (this._childrenListNode)
        }
    },
    get shouldRefreshChildren() {
        return this._shouldRefreshChildren;
    },

    set shouldRefreshChildren(x) {
        this._shouldRefreshChildren = x;
        if (x && this.expanded)
    },
    _setListItemNodeContent: function()
    {
        if (!this._listItemNode)
            return;
        if (typeof this._title === "string")
            this._listItemNode.textContent = this._title;
        else {
            this._listItemNode.removeChildren();
                this._listItemNode.appendChild(this._title);
        }
    }
}
TreeElement.prototype.appendChild = TreeOutline.prototype.appendChild;
TreeElement.prototype.insertChild = TreeOutline.prototype.insertChild;
TreeElement.prototype.insertBeforeChild = TreeOutline.prototype.insertBeforeChild;
TreeElement.prototype.removeChild = TreeOutline.prototype.removeChild;
TreeElement.prototype.removeChildAtIndex = TreeOutline.prototype.removeChildAtIndex;
TreeElement.prototype.removeChildren = TreeOutline.prototype.removeChildren;
TreeElement.prototype._attach = function()
{
    if (!this._listItemNode || this.parent._shouldRefreshChildren) {
        if (this._listItemNode && this._listItemNode.parentNode)

        this._listItemNode.treeElement = this;
        this._setListItemNodeContent();
            this._listItemNode.classList.add("hidden");

        this.onattach();
    }
    var nextSibling = null;
    if (this.nextSibling && this.nextSibling._listItemNode && this.nextSibling._listItemNode.parentNode === this.parent._childrenListNode)
        nextSibling = this.nextSibling._listItemNode;
    this.parent._childrenListNode.insertBefore(this._listItemNode, nextSibling);
        this.expand();
}
TreeElement.prototype._detach = function()
{
    if (this._listItemNode && this._listItemNode.parentNode)
        this._listItemNode.parentNode.removeChild(this._listItemNode);
}

TreeElement.treeElementMouseDown = function(event)
{
    var element = event.currentTarget;
        return;

    element.treeElement.selectOnMouseDown(event);
}
TreeElement.treeElementToggled = function(event)
{
    var element = event.currentTarget;
        return;

    var toggleOnClick = element.treeElement.toggleOnClick && !element.treeElement.selectable;
    var isInTriangle = element.treeElement.isEventWithinDisclosureTriangle(event);
        return;

    if (element.treeElement.expanded) {
        if (event.altKey)
        else
            element.treeElement.collapse();
    } else {
        if (event.altKey)
            element.treeElement.expandRecursively();
            element.treeElement.expand();
    }
    event.consume();
}

TreeElement.treeElementDoubleClicked = function(event)
{
    var element = event.currentTarget;
    if (!element || !element.treeElement)

    var handled = element.treeElement.ondblclick.call(element.treeElement, event);
        element.treeElement.expand();
}
TreeElement.prototype.collapse = function()
{


    if (this.treeOutline)
    this.oncollapse();
}
TreeElement.prototype.collapseRecursively = function()
{
    var item = this;
    while (item) {
        if (item.expanded)
        item = item.traverseNextTreeElement(false, this, true);
    }
}

TreeElement.prototype.expand = function()
{
        return;
    // of an infinite loop if onpopulate were to call expand.

    this.expanded = true;
        this.treeOutline._expandedStateMap.put(this.representedObject, true);
    if (this.treeOutline && (!this._childrenListNode || this._shouldRefreshChildren)) {
        if (this._childrenListNode && this._childrenListNode.parentNode)
        this._childrenListNode.classList.add("children");
            this._childrenListNode.classList.add("hidden");

        this.onpopulate();

        for (var i = 0; i < this.children.length; ++i)

        delete this._shouldRefreshChildren;
    }
    if (this._listItemNode) {
            this.parent._childrenListNode.insertBefore(this._childrenListNode, this._listItemNode.nextSibling);
    }
    if (this._childrenListNode)

    this.onexpand();
}

TreeElement.prototype.expandRecursively = function(maxDepth)
{
    var item = this;
    var info = {};
    var depth = 0;

    // in some case can be infinite, since JavaScript objects can hold circular references.
    // So default to a recursion cap of 3 levels, since that gives fairly good results.
        maxDepth = 3;
    while (item) {
            item.expand();
        item = item.traverseNextTreeElement(false, this, (depth >= maxDepth), info);
        depth += info.depthChange;
    }
}

TreeElement.prototype.hasAncestor = function(ancestor) {
    var currentNode = this.parent;
    while (currentNode) {
        currentNode = currentNode.parent;
    }

}
TreeElement.prototype.reveal = function()
{
    var currentAncestor = this.parent;
    while (currentAncestor && !currentAncestor.root) {
            currentAncestor.expand();
        currentAncestor = currentAncestor.parent;
    }
    this.onreveal(this);
}
TreeElement.prototype.revealed = function()
{
    var currentAncestor = this.parent;
    while (currentAncestor && !currentAncestor.root) {
        if (!currentAncestor.expanded)
            return false;
        currentAncestor = currentAncestor.parent;
    }
}

TreeElement.prototype.selectOnMouseDown = function(event)
{
    if (this.select(false, true))
}



TreeElement.prototype.select = function(omitFocus, selectedByUser)
{
    if (!this.treeOutline || !this.selectable || this.selected)
    if (this.treeOutline.selectedTreeElement)

    this.selected = true;
    if(!omitFocus)

    if (!this.treeOutline)
    this.treeOutline.selectedTreeElement = this;
    if (this._listItemNode)

    return this.onselect(selectedByUser);
}

TreeElement.prototype.revealAndSelect = function(omitFocus)
{
}

TreeElement.prototype.deselect = function(supressOnDeselect)
{
        this._listItemNode.classList.remove("selected");
}

// Overridden by subclasses.
TreeElement.prototype.onpopulate = function() { }
TreeElement.prototype.onenter = function() { }
TreeElement.prototype.ondelete = function() { }
TreeElement.prototype.onspace = function() { }
TreeElement.prototype.onattach = function() { }
TreeElement.prototype.onexpand = function() { }
TreeElement.prototype.oncollapse = function() { }
TreeElement.prototype.ondblclick = function() { }
TreeElement.prototype.onreveal = function() { }
/** @param {boolean=} selectedByUser */
TreeElement.prototype.onselect = function(selectedByUser) { }

/**
 * @param {boolean} skipUnrevealed
 * @param {(TreeOutline|TreeElement)=} stayWithin
 * @param {boolean=} dontPopulate
 * @param {Object=} info
 * @return {TreeElement}
 */


TreeElement.prototype.traverseNextTreeElement = function(skipUnrevealed, stayWithin, dontPopulate, info)
{
    if (info)
        info.depthChange = 0;

    var element = skipUnrevealed ? (this.revealed() ? this.children[0] : null) : this.children[0];
    if (element && (!skipUnrevealed || (skipUnrevealed && this.expanded))) {
            info.depthChange = 1;
    }

    if (this === stayWithin)
    element = skipUnrevealed ? (this.revealed() ? this.nextSibling : null) : this.nextSibling;
        return element;

    element = this;
    while (element && !element.root && !(skipUnrevealed ? (element.revealed() ? element.nextSibling : null) : element.nextSibling) && element.parent !== stayWithin) {
            info.depthChange -= 1;
        element = element.parent;
    }

}


TreeElement.prototype.traversePreviousTreeElement = function(skipUnrevealed, dontPopulate)
{
    var element = skipUnrevealed ? (this.revealed() ? this.previousSibling : null) : this.previousSibling;
    while (element && (skipUnrevealed ? (element.revealed() && element.expanded ? element.children[element.children.length - 1] : null) : element.children[element.children.length - 1])) {
            element.onpopulate();
        element = (skipUnrevealed ? (element.revealed() && element.expanded ? element.children[element.children.length - 1] : null) : element.children[element.children.length - 1]);
    }
        return element;

}
TreeElement.prototype.isEventWithinDisclosureTriangle = function(event)
{
    // FIXME: We should not use getComputedStyle(). For that we need to get rid of using ::before for disclosure triangle. (http://webk.it/74446)
    var paddingLeftValue = window.getComputedStyle(this._listItemNode).getPropertyValue("padding-left");
    var computedLeftPadding = paddingLeftValue ? paddingLeftValue : 0;
}
