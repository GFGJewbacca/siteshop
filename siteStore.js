import { shopCart } from './shopCart.js';

let shoppingCart = new shopCart();

////////////////////////////////////////
//Paypal funcionality
////////////////////////////////////////

const paypalButtonsComponent = paypal.Buttons({
  // optional styling for buttons
  // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
  style: {
    color: 'gold',
    shape: 'pill',
    layout: 'vertical',
    tagline: 'false',
  },

  // set up the transaction
  createOrder: (data, actions) => {
    // pass in any options from the v2 orders create call:
    // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
    const createOrderPayload = {
      purchase_units: [
        {
          amount: {
            value: shoppingCart.salePrice(),
          },
        },
      ],
    };

    return actions.order.create(createOrderPayload);
  },

  // finalize the transaction
  onApprove: (data, actions) => {
    const captureOrderHandler = (details) => {
      const payerName = details.payer.name.given_name;
      console.log('Transaction completed');
      window.location.href = 'downloads.html';
    };

    return actions.order.capture().then(captureOrderHandler);
  },

  // handle unrecoverable errors
  onError: (err) => {
    console.error('An error prevented the buyer from checking out with PayPal');
  },
});
paypalButtonsComponent.render('#paypal-button-container').catch((err) => {
  console.error('PayPal Buttons failed to render');
});

//Making sure the page is ready before executing jQuery code
$(function () {
  //Triggers and events

  //Loading the cart
  if (localStorage.getItem('storeCart') != null) {
    shoppingCart.loadCart();
  }

  //+1 copies
  $('#cart-window').on('click', '.plus', function () {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.addCopies(name, type);
    displayCart();
  });
  //-1 copies
  $('#cart-window').on('click', '.minus', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.removeCopies(name, type);
    displayCart();
  });
  //Setting a number of copies to an item
  $('#cart-window').on('change', '.set', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    let copies = Number($(this).val());
    shoppingCart.setCopies(name, type, copies);
    displayCart();
  });
  //Adding to the cart
  $('.add-to-cart').click(function () {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.addToCart(name, type);
    displayCart();
  });
  //Removing from the cart
  $('#cart-window').on('click', '.remove', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.removeFromCart(name, type);
    displayCart();
  });
  //Clearing the cart
  $('#clear').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });

  //Open&close the cart
  $('#openCart').click(function () {
    $('#show-cart').slideToggle('slow');
  });

  function displayCart() {
    /*Displays the cart as a table, with each cart item set to a new row in the table. Each table row has the item name, the price, the number of copies with buttons to add and remove copies, the item type and a remove from cart button.*/

    let output = ''; //Output of the cart table
    let percentOff = ''; //The current percentage of how much the user is saving
    let copies = shoppingCart.totalCopies();
    //Checks to see if there are items in the cart before displaying the table
    if (shoppingCart.cart.length == 0) {
      //Hides the Paypal buttons with an empty cart
      $('#paypal-button-container').css('display', 'none');
      output =
        '<h3><i>Your cart is empty</i></h3><br>' +
        '<div id="paypal-button-container"></div>';
    } else {
      //Displays the Paypal buttons when items are in the cart
      $('#paypal-button-container').css('display', 'block');
      //Setting up the table and headers: Name, Price, Copies and Type
      output =
        '<table id="cart-table"><th>Name</th><th>Price</th><th colspan="3">Copies</th><th>Type</th>';
      shoppingCart.cart.forEach((item) => {
        output +=
          //First in the row - name
          '<tr>' +
          '<td class="cartitem">' +
          item.name +
          '</td>' +
          //Second in the row - item price
          '<td class="cartitem">$' +
          item.price +
          '</td>' +
          //Third in the row - remove copies button
          '<td class="cartitem"><button class="minus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">-</button></td><td>' +
          //Fourth in the row - number of copies form input
          '<input type=text class="set" size="3" value="' +
          item.copies +
          '" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '"></td>' +
          //Fifth in the row - add copies button
          '<td class="cartitem"><button class="plus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">+</button></td>' +
          '<td class="cartitem">' + // Sixth in the row - item type
          item.type +
          '</td>' +
          //Seventh in the row - remove item button
          '<td class="cartitem"><button class="remove" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">X</button></td>';
      });

      /*CLosing up the table, displaying number of copies,
      savings, total price, and a checkout button */
      output +=
        //Number of copies
        '</table><br><span class="cartEnder">Copies: </span>' +
        '<span id="total-copies"></span><br>' +
        //How much the user has saved in $
        '<span class="cartEnder">You saved: </span>' +
        '<span id="savings"></span> ' +
        //Current percentage the user is saving
        '<span id="percentOff" class="important"></span> <br>' +
        '<span class="cartEnder">Total: </span>' +
        //User's shopping cart total
        '<span id="total-price"></span><br>';

      /*Displays the percentage the user is saving based on number of
        the number of copies in the cart*/
      if (copies >= 12 && copies < 25) {
        //5% discount between 12 and 24 copies
        percentOff = '5% discount';
      } else if (copies >= 25 && copies < 50) {
        //10% discount between 25 and 49 copies
        percentOff = '10% discount';
      } else if (copies >= 50 && copies < 100) {
        //15% discount between 50 and 99 copies
        percentOff = '15% discount';
      } else if (copies >= 100) {
        //20% discount at 100+ copies
        percentOff = '20% discount';
      }
    }
    //Displaying the necessary parts of the cart and store
    $('#cart-window').html(output);
    $('#savings').html(shoppingCart.savings());
    $('#total-price').html(shoppingCart.salePrice());
    $('#total-items').html(shoppingCart.cart.length);
    $('#total-copies').html(shoppingCart.totalCopies());
    $('#percentOff').html(percentOff);
  }

  //Makes sure the cart starts off displayed.
  displayCart();

  function downloadLinks() {
    //Takes the items from the cart and outputs download links for each item as a button

    let output = '';
    //Create a new shopping cart for checkout to preserve the initial cart
    let checkoutCart = new shopCart();
    //Load the saved cart created upon checkout
    checkoutCart.cart = JSON.parse(localStorage.getItem('storeCart'));
    //Go through the cart and output download links as buttons
    checkoutCart.cart.forEach((item) => {
      output +=
        '<a class="storebutton" href="' +
        shoppingCart.getLocation(item.name, item.type) +
        '" download> Download ' +
        item.name +
        ' - ' +
        item.type +
        '</a><br>';
    });
    $('#show-downloads').html(output);
  }
});
