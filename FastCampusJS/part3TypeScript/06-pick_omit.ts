interface Vehicle {
  brand: string;
  numberOfWheel: number;
  engine: boolean;
}

type Bicycle = Pick<Vehicle, 'brand' | 'numberOfWheel'>;

type AirPlaine = Omit<Vehicle, 'numberOfWheel'>;

interface Aircraft {
  numberOfWing: number;
  dashboard: boolean;
}

type newAircraft = Omit<Vehicle, 'numberOfWheel'> &
  Pick<Aircraft, 'numberOfWing'>;

const newA: newAircraft = {
  numberOfWing: 1,
  brand: 'boeing',
  engine: true,
};
