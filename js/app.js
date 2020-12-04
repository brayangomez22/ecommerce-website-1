(function(){
    const cardInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cardInfo.addEventListener("click", function(){
        cart.classList.toggle("show-cart");
    })
})();

//=============================================
// ADD ITEMS TO THE CART
//=============================================

(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');

    cartBtn.forEach(function(btn){
        btn.addEventListener("click", function(event){  

            if(event.target.parentElement.classList.contains('store-item-icon')){
                let fullPath = event.target.parentElement.
                previousElementSibling.src;

                const item = {};
                item.img = fullPath;

                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

                item.name = name;

                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                let finalPrice = price.slice(1).trim();

                item.price = finalPrice;
                
                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3'
                );

                cartItem.innerHTML = `
                        <img src="${item.img}" id="item-img" class="img-fluid rounded-circle" alt="" style="width:50px;height:50px;">

                        <div class="item-text">
                            <p id="cart-item-title" class="cart-item-title">${item.name}  </p>
                            <span>$</span>
                            <span id="cart-item-price" class="cart-item-price">${item.price}</span>
                        </div>

                        <a href="#" id='cart-item-remove' class="cart-item-remove">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                `;

                //=============================================
                // SELECT CARD 
                //=============================================
                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                alert("Item added to the cart");
                showTotals();
                deleteProduct(item);
            }
        });
    });

    //=============================================
    // ELIMINAR PRODUCTO 
    //=============================================

    function deleteProduct(item){
        const cartItemRemove = document.querySelectorAll('#cart-item-remove');

        cartItemRemove.forEach(function(i){
            i.addEventListener("click", function(event){
                const p = this.parentElement;
                p.remove();
                showTotals();
            });
        });
    };

    //=============================================
    // SHOW TOTALS 
    //=============================================
    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        })

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;   
        }, 0);

        const finalMoney = totalMoney.toFixed(2);

        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }

})();