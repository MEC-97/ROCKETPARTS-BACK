let databasePopulated = false;

const setDatabasePopulated = (value) => {
  databasePopulated = value;
};

const getDatabasePopulated = () => {
  return databasePopulated;
};

module.exports = {
  setDatabasePopulated,
  getDatabasePopulated
};
 