import ProductListLoading from "./components/ProductList.js";
import ProductList from "./components/ProductList.js";
import { getProducts } from "./api/productApi.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

function main() {
  // root 요소를 찾거나 생성
  const rootElement = document.getElementById("root");
  // if (!rootElement) {
  //   rootElement = document.createElement("div");
  //   rootElement.id = "root";
  //   document.body.appendChild(rootElement);
  // }
  rootElement.innerHTML = ProductListLoading;
  getProducts({ page: 1, limit: 20 }).then((data) => {
    console.log(data);
    rootElement.innerHTML = ProductList();
  });
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
