import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { RegistrationFormPage } from '../pages/RegistrationFormPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';

test('user can register', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new LoginSignupPage(page);
  const form = new RegistrationFormPage(page, signup);
  const confirmation = new AccountCreatedPage(page);

  await home.goTo();
  await home.clickSignupLogin();
  await signup.fillSignupForm();
  await form.assertNameAndEmailFilledCorrectly();
  await form.fillForm();
  await form.clickCreateAccount();
  await confirmation.expectVisible();
});
