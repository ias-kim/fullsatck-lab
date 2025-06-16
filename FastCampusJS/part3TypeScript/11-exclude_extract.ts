type Type0 = Exclude<'1' | '2' | '3', '2' | '3' | '4'>;
type Type1 = Exclude<string | number | Function, number | Function>;

type Type2 = Extract<'1' | '2' | '3', '2' | '3' | '4'>;
type Type3 = Extract<string | number | Function, number | Function>;
