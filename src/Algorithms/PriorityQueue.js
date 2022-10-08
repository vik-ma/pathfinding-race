// Priority Queue abstract datatype to be used in algorithms, since JavaScript does not have a built in one.
// From https://linuxhint.com/priority-queue-javascript/

export function PriorityQueue() {
  var array = [];
  this.returnCollection = function () {
    return array;
  };
  this.enqueue = function (newMem) {
    if (this.isEmpty()) {
      array.push(newMem);
    } else {
      var added = false;
      for (var i = 0; i < array.length; i++) {
        if (newMem[1] < array[i][1]) {
          array.splice(i, 0, newMem);
          added = true;
          break;
        }
      }
      if (!added) {
        array.push(newMem);
      }
    }
  };
  this.dequeue = function () {
    var value = array.shift();
    return value[0];
  };
  this.front = function () {
    return array[0];
  };
  this.size = function () {
    return array.length;
  };
  this.isEmpty = function () {
    return array.length === 0;
  };
}
