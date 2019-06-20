const ipToInt = (ip) => ip.split('.').reduce(
  (acc, octet) => acc * 256 + parseInt(octet)
, 0)

const intToIp = (int) => `${int >>> 24}.${int >> 16 & 255}.${int >> 8 & 255}.${int & 255}`

export {
  ipToInt,
  intToIp,
}