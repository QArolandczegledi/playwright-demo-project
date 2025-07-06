import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';

test('user can login', async({page}) => {
    const home = new HomePage(page);
    const loginSignUpPage = new LoginSignupPage(page);

    await home.goTo();
    await home.clickSignupLogin();
    await loginSignUpPage.fillLogin("automationdemo@project.com", "alohomora");
    await loginSignUpPage.assertLogoutVisible();
})
