function oderCoffee(type, sugar, milk) {
    return "\uC8FC\uBB38 :".concat(type, " ").concat(sugar ? '설탕 추가' : '설탕 없이', " \n    ").concat(milk ? '우유 추가' : '우유 없이');
}
function withOrderLogging(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log(fn.apply(void 0, args));
}
withOrderLogging(oderCoffee, 'string', false, true);
//
// // 리턴 타입
//
// async function fetchData<T>(url: string): Promise<T> {
//   const response = await fetch(url);
//   const data: T = await response.json();
//   return data;
// }
//
// type FetchResult = ReturnType<() => Promise<string>;
//
// type StringFetchResult = FetchResult<string>;
