const CheckDuplicateField = async (field, value, Model) => {
  const duplicateField = (await Model.where(field).equals(value).count()) > 0;
  return duplicateField;
};

export default CheckDuplicateField;
