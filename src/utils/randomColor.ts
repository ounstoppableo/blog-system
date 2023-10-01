export default function () {
  let str = '#'
  const arr = [8, 9, 'a', 'b', 'c', 'd']
  for (let i = 0; i < 6; i++) {
    str += arr[Math.floor(Math.random() * arr.length)]
  }
  return str
}
