export const getArgs = (args) => {
  const res = {}
  const [executor, file, ...rest] = args

  rest.forEach((elem, index, arr) => {
    if (elem.startsWith("-")) {
      if (index === arr.length - 1) {
        res[elem.substring(1)] = true
      } else if (!arr[index + 1].startsWith("-")) {
        res[elem.substring(1)] = arr[index + 1]
      } else {
        res[elem.substring(1)] = true
      }
    }
  })

  return res
}
