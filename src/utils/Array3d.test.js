import Array3d from "./Array3d";

test('Array-3D', () => {
  const array3d = new Array3d();
  array3d.set(0, 0, 0, '#');
  const value = array3d.get(0, 0, 0);
  expect('#').toEqual(value);
  array3d.set(0, 0, 0, '.');
  expect('.').toEqual(value);
});