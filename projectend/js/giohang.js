const removeFromCart = (name) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
};

const updateQuantity = (name, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find((item) => item.name === name);
    if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
            removeFromCart(name);
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    showCart();
};

const calculateTotal = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => {
        let price = parseFloat(item.price.replace(/[^0-9]/g, ""));
        return sum + price * item.quantity;
    }, 0);
    return total.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const showCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = `
        <div class="cart-container">
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tạm Tính</th>
                </tr>
            </thead>
            <tbody id="cart-items">
                <!-- Cart items will be injected here -->
            </tbody>
        </table>
        <div class="cart-actions">
            <button id="continue-shopping">← Tiếp Tục Xem Sản Phẩm</button>
            </div>
      
            <div class="cart-summary">
            
           
           
            <div class="summary-row">
            <span>Giao hàng</span>
            <span>Giao hàng miễn phí</span>
            </div>
           
            
           
            </div>
           
            <div class="coupon">
            <label for="coupon-code">Phiếu ưu đãi</label>
            <input type="text" id="coupon-code" placeholder="Mã ưu đãi">
            <button id="apply-coupon">Áp Dụng</button>
            <button id="checkout">Tiến Hành Thanh Toán</button>
        </div>

    </div>`;






    let tbody = cartItems.querySelector("tbody");

    cart.forEach((item) => {
        let tr = document.createElement("tr");

        let productTd = document.createElement("td");
        let productDiv = document.createElement("div");
        productDiv.classList.add("cart-item");

        let img = document.createElement("img");
        img.setAttribute("src", item.img);

        let name = document.createElement("span");
        name.innerText = item.name;
        name.innerText
        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productTd.appendChild(productDiv);

        let priceTd = document.createElement("td");
        priceTd.innerText = item.price;

        let quantityTd = document.createElement("td");
        let quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        let minusBtn = document.createElement("button");
        minusBtn.innerText = "-";
        minusBtn.classList.add("quantity-btn");
        minusBtn.onclick = () => updateQuantity(item.name, item.quantity - 1);

        let quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.classList.add("quantity-input");
        
        quantityInput.onchange = (e) =>
            updateQuantity(item.name, parseInt(e.target.value));

        let plusBtn = document.createElement("button");
        plusBtn.innerText = "+";
        plusBtn.classList.add("quantity-btn");
        plusBtn.onclick = () => updateQuantity(item.name, item.quantity + 1);

        quantityContainer.appendChild(minusBtn);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(plusBtn);

        quantityTd.appendChild(quantityContainer);

        let subtotalTd = document.createElement("td");
        let price = parseFloat(item.price.replace(/[^0-9]/g, ""));
        subtotalTd.innerText = (price * item.quantity).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
      
        tr.appendChild(productTd);
        tr.appendChild(priceTd);
        tr.appendChild(quantityTd);
        tr.appendChild(subtotalTd);

        tbody.appendChild(tr);
    });

    let totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `Tổng giá: ${calculateTotal()}`;
    cartItems.appendChild(totalDiv);

    
    // quay tro lai trang san pham
    document.getElementById("continue-shopping").addEventListener("click", () => {
        window.location.href = "sanpham.html";
    });
};


document.addEventListener("DOMContentLoaded", () => {
   
    showCart();
});
