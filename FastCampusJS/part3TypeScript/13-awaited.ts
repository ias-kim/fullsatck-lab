async function fetchFromNet(): Promise<string> {
  return 'data';
}

type FetchData = Awaited<ReturnType<typeof fetchFromNet>>;
