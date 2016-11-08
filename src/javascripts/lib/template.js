export function format(template, variables) {
  return Object.keys(variables).reduce((result, variableName) => {
    return result.replace("${" + variableName  + "}", variables[variableName]);
  }, template);
}
