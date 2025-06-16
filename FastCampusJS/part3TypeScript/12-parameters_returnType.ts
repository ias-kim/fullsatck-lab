function oderCoffee(type: string, sugar: boolean, milk: boolean) {
  return `주문 :${type} ${sugar ? '설탕 추가' : '설탕 없이'} 
    ${milk ? '우유 추가' : '우유 없이'}`;
}

type orderCoffeeParams = Parameters<typeof oderCoffee>;

function withOrderLogging(
  fn: (...args: orderCoffeeParams) => string,
  ...args: orderCoffeeParams
) {
  console.log(fn(...args));
}

withOrderLogging(oderCoffee, 'string', false, true);

// 리턴 타입

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

//
// type FetchResult<T> = ReturnType<() => Promise<T>>;
type StringFetchResult = Promise<string>;
