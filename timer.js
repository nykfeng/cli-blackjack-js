const loader = async function () {
  return new Promise((r) => setTimeout(r, 2000));
};

export default {
  loader,
};
