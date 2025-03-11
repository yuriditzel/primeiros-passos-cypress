import userData from '../fixtures/user-data.json'
import DashboardPage from '../pages/dashboardPage'
import LoginPage from '../pages/loginPage'
import MenuPage from '../pages/menuPage'


const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorsList = {
    
    firstNameField: "[name= 'firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    nationalityBox: ".oxd-select-text--arrow",
    genericCombobox: ".oxd-select-text--arrow",
    thirdItemCombobox: ".oxd-select-dropdown > :nth-child(3)"
    

  }


  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    dashboardPage.checkDashboardPage()
    menuPage.accessMyInfo()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type("LastNameTest")
    cy.get(selectorsList.genericField).eq(2).clear().type('NicknameTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('Employee')
    cy.get(selectorsList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorsList.genericField).eq(5).clear().type('Drivers License Number Test')
    cy.get(selectorsList.dateField).eq(0).clear().type('2025-03-10')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.nationalityBox).eq(0).type('5')
    cy.get(selectorsList.genericCombobox).eq(1).click()
    cy.get(selectorsList.thirdItemCombobox).click()
    cy.get(selectorsList.submitButton).eq(0).click({ force: true})
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast-close')
    
     
  })
    it('Login - Fail', () => {
      cy.visit('/auth/login')
      cy.get(selectorsList.usernameField).type(userData.userFail.username)
      cy.get(selectorsList.passwordField).type(userData.userFail.password)
      cy.get(selectorsList.loginButton).click()
      cy.get(selectorsList.wrongCredentialAlert)
      
    })
})