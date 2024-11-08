class ProductsPage {
    constructor(page) {
        this.page = page;
        this.firstProductName = page.locator('.inventory_item_name').first();
        this.firstProductPrice = page.locator('.inventory_item_price').first();
        this.addToCartButton = page.locator('.btn_inventory').first();
    }

    async addFirstProductToCart() {
        const name = await this.firstProductName.textContent();
        const price = await this.firstProductPrice.textContent();
        await this.addToCartButton.click();
        return { name, price };
    }
}
module.exports = ProductsPage;