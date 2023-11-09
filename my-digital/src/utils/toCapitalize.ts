function toCapitalize(value: string) {
  const newValue = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
  return newValue
}

export default toCapitalize
