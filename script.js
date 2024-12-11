document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartContainer = document.querySelector(".cart");
    const cartItemsElement = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".total");

    // Atualiza o carrinho
    function updateCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.classList.add("hidden");
        } else {
            cartContainer.classList.remove("hidden");

            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - R$ ${item.price.toFixed(2)}
                    <button class="remove" data-index="${index}">X</button>
                `;
                cartItemsElement.appendChild(li);
                total += item.price;
            });
        }

        totalElement.textContent = Total: R$ ${total.toFixed(2)};
    }

    // Adiciona um produto ao carrinho
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product");
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            cart.push({ name, price });
            updateCart();
        });
    });

    // Remove um produto do carrinho
    cartItemsElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Finalizar compra
    document.querySelector(".checkout").addEventListener("click", () => {
        alert("Compra finalizada com sucesso!");
        cart.length = 0;
        updateCart();
    });

    // Inicializa com o carrinho oculto
    updateCart();
});
