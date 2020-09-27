export const formatYen = (number: string | number) => {
  let target = 0
  if (typeof number === 'string') {
    target = parseInt(number)
  } else {
    target = number
  }
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(target)
}
