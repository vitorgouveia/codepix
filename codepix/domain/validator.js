export const uuid = (value) => {
  const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-(4|1)[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if(!uuidPattern.test(value)) {
    throw new Error(`"${value}" must be of type UUID!`)
  }

  return value
}