/**
 * 원시 타입
 * Number, String, Boolean, null, undefined
 *
 * any, void, never
 * any : 어떤 값이든 들어올 수 있음
 * void : 값이 없음
 */
var num1 = 100;
var num2 = 100;
function add(a, b) {
    return a + b;
}
console.log(add(num1, num2));
function printLog(msg) {
    console.log(msg);
}
var returnValue = printLog('print');
console.log('return Value: ', returnValue);
function throwError() {
    throw new Error('err');
    console.log('err');
}
function infiniteLoop() {
    while (true) {
        // loop
    }
}
function validCheck(arg) {
    // const neverValue: never = null;
}
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
function selectColor(color) {
    switch (color) {
        case Color.Red:
            break;
        case Color.Blue:
            break;
        case Color.Green:
            break;
        default:
            validCheck(color); // 들어 갈 수 없어야함.
    }
}
/**
 * Object, Array
 *
 * Tuple : 고정된 배열인데 인덱스마다 타입이 다를때
 */
var obj = { name: 'John' };
var arr = [0, 1, 2];
var obj2 = { name: 'John' };
var arr2 = [0, 1, 2];
var tupl = [0, '1', '2', 3];
// enum : 열거형
var Type;
(function (Type) {
    Type["User"] = "user";
    Type["Admin"] = "admin";
})(Type || (Type = {}));
console.log('type enum', Type.User, Type.Admin);
