const loader = async function (ms = 3000) {
  return new Promise((r) => setTimeout(r, ms));
};

export default {
  loader,
};
