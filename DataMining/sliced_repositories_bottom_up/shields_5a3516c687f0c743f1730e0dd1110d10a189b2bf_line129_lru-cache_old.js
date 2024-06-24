// In-memory KV, remove the oldest data when the capacity is reached.
const typeEnum = {
  unit: 0,
  heap: 1,
};
function CacheSlot(key, value) {
  this.key = key;
  this.value = value;
  this.older = null;  // Newest slot that is older than this slot.
}
function Cache(capacity, type) {
  type = type || 'unit';
  this.capacity = capacity;
  this.type = typeEnum[type];
  this.oldest = null;
}
Cache.prototype = {
  set: function addToCache(cacheKey, cached) {
    let slot = this.cache.get(cacheKey);
    if (slot === undefined) {
      slot = new CacheSlot(cacheKey, cached);
    }
    this.makeNewest(slot);
    const numItemsToRemove = this.limitReached();
    if (numItemsToRemove > 0) {
      for (let i = 0; i < numItemsToRemove; i++) {
        this.removeOldest();
      }
    }
  },
  get: function getFromCache(cacheKey) {
    const slot = this.cache.get(cacheKey);
    if (slot !== undefined) {
      return slot.value;
    }
  },
  makeNewest: function makeNewestSlot(slot) {
    const previousNewest = this.newest;
    const older = slot.older;
    const newer = slot.newer;
    if (older !== null) {
      older.newer = newer;
    } else if (newer !== null) {
    if (newer !== null) {
      newer.older = older;
    }
    if (previousNewest !== null) {
      slot.older = previousNewest;
      slot.newer = null;
      previousNewest.newer = slot;
    } else {
    }
  },
  removeOldest: function removeOldest() {
    const cacheKey = this.oldest.key;
    this.cache.delete(cacheKey);
  },
  limitReached: function heuristic() {
    if (this.type === typeEnum.unit) {
      // Remove the excess.
      return Math.max(0, (this.cache.size - this.capacity));
    } else if (this.type === typeEnum.heap) {
      if (getHeapSize() >= this.capacity) {
        console.log('LRU HEURISTIC heap:', getHeapSize());
        // Remove half of them.
        return (this.cache.size >> 1);
      } else { return 0; }
    } else {
  },
  clear: function () {
  }
};
let heapSize;
let heapSizeTimeout;
function getHeapSize() {
  if (heapSizeTimeout == null) {
    heapSizeTimeout = setInterval(computeHeapSize, 60 * 1000);
  } else {
}
function computeHeapSize() {
  return heapSize = process.memoryUsage().heapTotal;
}
