var data = [100];
var size = { width: 1280, height: 720 };
// size.width = 123;
var ClassA = /** @class */ (function () {
    function ClassA() {
    }
    return ClassA;
}());
var classA = new ClassA();
var immutableRotateData = Object.freeze({ angle: 180 });
console.log(immutableRotateData);
// immutableRotateData.angle = 90;
