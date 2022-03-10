/* 
array is the list of objects { name , lastName ,... } with only the values to check 
NB :Avoid put all the user object to not conflict the research with the id for example 
inputValue is the typed seach valye 
verified is the access query if null ignore else check it value 
*/

const filterUser = (array, { inputValue, verified = null }) => {
  const rgx = new RegExp(inputValue.replace(/[-+/*]/gi, ""), "i", "g");
  const result = array.filter(
    querys =>
      makeTest(querys, rgx) &&
      (verified === null ? true : verified === querys.isGranted)
  );
  return result;
};

function makeTest(obj, rgx) {
  const values = Object.values(obj);
  //remove id , role and boolean values
  const filterValues = values.filter(
    el =>
      typeof el !== "boolean" &&
      obj._id !== el &&
      obj.id !== el &&
      obj.role !== el
  );
  let result = false;
  filterValues.forEach(value => {
    if (rgx.test(value)) {
      result = true;
    }
  });
  return result;
}

export default filterUser;
