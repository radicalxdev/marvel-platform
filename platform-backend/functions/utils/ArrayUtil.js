const firebaseDocsToArray = (docs) => {
  const array = [];
  docs.forEach((doc) =>
    array.push({ ...doc.data(), id: doc.id, ref: doc.ref })
  );
  return array;
};

module.exports = {
  firebaseDocsToArray,
};
