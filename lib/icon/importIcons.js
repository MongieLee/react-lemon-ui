let importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  // require.context是webpack提供的api，用于批量导入模块
  importAll(require.context("./icons", true, /\.svg$/));
} catch (err) {
  console.log(err);
}
