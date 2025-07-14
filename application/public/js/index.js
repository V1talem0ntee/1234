document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const photoCount = document.getElementById("photo-count");

    // 加载商品数据
    fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            photoCount.textContent = `Displaying ${products.length} products`;

            products.forEach((product, index) => {
                const card = document.createElement("div");
                card.className = "product-card";

                card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h4>${product.title}</h4>
          <p>$${product.price}</p>
        `;

                // 点击后淡出并移除卡片
                card.addEventListener("click", () => {
                    card.style.opacity = "0";
                    setTimeout(() => {
                        card.remove();
                        updatePhotoCount();
                    }, 1000); // 1秒后移除
                });

                gallery.appendChild(card);
            });
        })
        .catch(err => {
            photoCount.textContent = "Failed to load products.";
            console.error("Error loading products:", err);
        });

    // 更新商品数量
    function updatePhotoCount() {
        const count = document.querySelectorAll(".product-card").length;
        photoCount.textContent = `Displaying ${count} products`;
    }
});
