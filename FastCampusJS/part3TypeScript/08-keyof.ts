type ResultData = {
  code: number;
  isError: boolean;
  data: object;
};

type ResultKeys = keyof ResultData;

const keys: ResultKeys = 'code';

const carInfo = {
  numberOfWheel: 4,
  numberOfWindow: 6,
  engine: true,
};

const carInfoKeys: keyof typeof carInfo = 'engine';
