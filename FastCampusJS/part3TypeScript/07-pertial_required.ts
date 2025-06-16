interface SomeUser {
  id: string;
  name: string;
  age: number;
}

type PartialUser = Partial<SomeUser>;

const partialUser: PartialUser = {};

type RequiredUser = Required<PartialUser>;

const requiredUser: RequiredUser = {
  id: 'string',
  name: 'kine',
  age: 20,
};
