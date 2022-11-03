function getJsonData(url) {
    var data = jQuery.ajax({
        url: url,
        success: function (result) {
            return result;
        },
        async: false
    });
    return data;
}

$(document).ready(function () {

    let ProductDiv = document.querySelector("#product-list");
    let ProductDiv2 = document.querySelector("#swiper-list");

    let out = "";
    let out2 = "";

    var relatedProducts = getJsonData('relatedProducts.json');
    var bestSeller = getJsonData('bestSeller.json');

    $.each(relatedProducts.responseJSON, function (index,data) {
        var checkcargo = "";
        if(data.samedayshipping == true)
        {
            checkcargo += `<div class="samedaycargo"><p>BU GÜN KARGODA</p></div>`;
        }

        out += `
            <div class=" product-list-item widget-item">
            <img class="product-list-img" src="${data["img"]}">
            <p class="product-star"><i class="fas fa-star"></i> 0 <span class="product-comment">(122 yorum)</span></p>
            <p class="product-code">${data["code"]}</p>
            <p class="product-name">${data["title"]}</p>
            <p class="product-price">₺${data["price"]}</p>  
            ${checkcargo}
            <div class="basket">
            <span class="change" ><i class="fal fa-exchange"></i></span>
            <button type="button" onclick="addToCart('${data.code}','${data.price}')"  class="basket-button">SEPETE EKLE</button>
            </div>
            </div>
            </div>
            `;
    });
    ProductDiv.innerHTML = out;

    $.each(bestSeller.responseJSON, function (index, data) {
        var checkcargo = "";
        if(data.samedayshipping == true)
        {
            checkcargo += `<div class="samedaycargo"><p>BU GÜN KARGODA</p></div>`;
        }
        out2 += `
        <div class=" swiper-slide swiper-slide2">
        <div class=" product-list-item widget-item">
        <img class="product-list-img" src="${data["img"]}">
        <p class="product-star"><i class="fas fa-star"></i> 0 <span class="product-comment">(122 yorum)</span></p>
        <p class="product-code">${data["code"]}</p>
        <p class="product-name">${data["title"]}</p>
        <p class="product-price">₺${data["price"]}</p>  
        ${checkcargo}
        <div class="basket">
        <span class="change" ><i class="fal fa-exchange"></i></span>
        <button type="button" onclick="addToCart('${data.code}','${data.price}')" class="basket-button">SEPETE EKLE</button>
        </div>
        </div>
        </div>
        </div>
        `;
    });

    ProductDiv2.innerHTML = out2;

});

var cart = [];
$(function () {
    if (localStorage.cart) {

        cart = JSON.parse(localStorage.cart);
        showCart();
    }
});


function addToCart(ProductCode, productprice) {



    var price = productprice
    var code = ProductCode
    var productcount = 1;


    for (var i in cart) {
        if (cart[i].Product == name) {
            cart[i].code = code;
            cart[i].Count += productcount;
            showCart();
            saveCart();
            return;
        }




    }

    var item = { Price: price, Qty: code, Count: productcount };
    cart.push(item);
    alert("Ürün Sepete Eklendi : " + code);

    saveCart();
    showCart();

}

function saveCart() {
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}


function showCart() {
    if (cart.length == 0) {
        $("#cart").css("visibility", "hidden");

        return;
    }

    $("#cart").css("visibility", "visible");
    $("#cartBody").empty();
    for (var i in cart) {
        var item = cart[i];
        var row = "<tr><td>" + item.Product + "</td><td>" + item.Count + "</td><td>" +
            item.Price + "</td><td>" + item.Qty + "</td><td>"
            + item.Count * item.Price + "</td><td>"
            + "<button onclick='localStorage.removeItem('cart'," + i + ");'>Delete</button></td></tr>";
        $("#cartBody").append(row);

    }

    const count = document.getElementById('basket-item-count');

    count.textContent = '';

    var itemcount = Object.keys(JSON.parse(localStorage.getItem('cart'))).length
    $("#basket-item-count").append(itemcount);
}


