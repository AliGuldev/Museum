  //this key links the shop to the cart

    const CART_KEY = 'museumCartV1';
    

// This function reads the Cart information and write it to JSON  
    function readCart() {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch { return []; }
    }

    function writeCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
 
/*This function is called by the addToCart button the first part reads the dataset contined in the buttons and asssigns the values to variables */

    function addToCart(btn) {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const unitPrice = Number(btn.dataset.price);
      const image = btn.dataset.image;

/* This part puts all of the individual items and puts them into an object called cart and writes it to LocalStorage   */

      let cart = readCart();
      const idx = cart.findIndex(it => it.id === id);
      if (idx >= 0) {
        cart[idx].qty += 1;
      } else {
        cart.push({ id, name, unitPrice, qty: 1, image });
      }
      writeCart(cart);

      // Update the item card's qty badge

      const card = btn.closest('.souvenir-item');
      if (card) {
        const badge = card.querySelector('.qty-badge');
        if (badge) {
          const item = cart.find(it => it.id === id);
          badge.textContent = item ? `Qty: ${item.qty}` : '';
        }
      }
    }

    function openModal(imgElement) {
      const modal = document.getElementById("modal");
      const modalImage = document.getElementById("modal-image");
      modalImage.src = imgElement.src;
      modalImage.alt = imgElement.alt;
      modal.style.display = "block";
    }

    function closeModal() {
      document.getElementById("modal").style.display = "none";
    }

    window.onclick = function(event) {
      const modal = document.getElementById("modal");
      if (event.target === modal) {
        closeModal();
      }
    }