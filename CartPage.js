class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
    }

    async verifyProductInCart(productName) {
        const productNames = await this.cartItems.locator('.inventory_item_name').allTextContents();
        return productNames.includes(productName);
    }
}
module.exports = CartPage;