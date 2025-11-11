// 최대힙 (Max Heap)
let pq = new PriorityQueue(function (a, b) {
  return a.cash - b.cash;
});

pq.enq({ cash: 250, name: 'Doohyun Kim' });
pq.enq({ cash: 300, name: 'Giloding Hong' });
pq.enq({ cash: 150, name: 'Minchul Han' });

console.log(pq.size());
console.log(pq.deq());
console.log(pq.peek());
console.log(pq.size());
