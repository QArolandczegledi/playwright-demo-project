import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/orderConfirmationPage';
import { PaymentPage } from '../pages/paymentPage';

test('user can complete checkout flow and validate invoice', async ({ page }) => {
  const home = new HomePage(page);
  const loginSignup = new LoginSignupPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page, products);
  const payment = new PaymentPage(page);
  const confirmation = new OrderConfirmationPage(page);

  // Registration
  await home.goTo();
  await home.clickSignupLogin();
  await loginSignup.fillLogin("automationdemo@project.com", "alohomora");
  await loginSignup.assertLogoutVisible();

  // Product selection
  await home.productsLink();
  await products.selectRandomProducts();
  const selectedProducts = products.getSelectedProducts();

  // Cart
  await page.getByRole('link', { name: 'Cart' }).click();
  await cart.validateCartContents(selectedProducts);
  await cart.clickProceedToCheckout();

  // Total
  await checkout.verifyOrderSummary();
  await checkout.clickPlaceOrderButton();

  // Payment
  await payment.fillPaymentDetails();
  await payment.submitPayment();

  // Confirmationa and invoice
  await confirmation.expectConfirmationVisible();
  const invoicePath = await confirmation.downloadInvoice();

  const totalAmount = selectedProducts.reduce((sum, p) => {
    const numericPrice = parseInt(p.price.replace(/\D/g, ''));
    return sum + numericPrice;
  }, 0);

  const testUserName = "Automation Test";

  await confirmation.validateInvoiceContent(
    invoicePath,
    testUserName,
    totalAmount.toString()
  );
});
