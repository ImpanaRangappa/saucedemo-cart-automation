const fs = require('fs');
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test('Add to Cart Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Navigate to the site
    await page.goto('https://www.saucedemo.com');

    // Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify we are on the Products page
    expect(await page.url()).toContain('/inventory.html');

    // Add first product to cart and store details in a file
    const { name, price } = await productsPage.addFirstProductToCart();
    const fs = require('fs');
    fs.writeFileSync('product.txt','Name: ${name}, Price: ${price}');

    // Navigate to the cart and verify product is added
    await page.locator('.shopping_cart_link').click();
    const isProductInCart = await cartPage.verifyProductInCart(name);
    expect(isProductInCart).toBeTruthy();

    // Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
});