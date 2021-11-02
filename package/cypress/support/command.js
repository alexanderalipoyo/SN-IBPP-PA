// ***********************************************
// This commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

/*************************************************
Use below custom commands to preserve LocalStorage 
session across tests whitin same script.
In your script you need to just put below line before 
first test.
      beforeEach(() => {
        cy.restoreLocalStorage();
      });
      
      afterEach(() => {
        cy.saveLocalStorage();
      });
**************************************************/

// let LOCAL_STORAGE_MEMORY = {};

// Cypress.Commands.add("saveLocalStorage", () => {
//   Object.keys(localStorage).forEach((key) => {
//     LOCAL_STORAGE_MEMORY[key] = localStorage[key];
//   });
// });

// Cypress.Commands.add("restoreLocalStorage", () => {
//   Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
//     localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
//   });
// });

/***************************************************
Use below command to find elements inside the iframe
****************************************************/

Cypress.Commands.add("type_ckeditor", (element, content) => {
  cy.window().then((win) => {
    win.CKEDITOR.instances[element].setData(content);
  });
});

/*************************************************
Use below custom command to be able to access new domain name and
do assertions
  # Last updated by    :  Alex Alipoyo      
  # Last updated on    :  06 Oct 2021
**************************************************/

Cypress.Commands.add("openNewDomainName", (alias) => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as(alias).callsFake(url => 
    {
      win.location.href = url;
    }); 
  })
});

/*************************************************
Use below custom command to get a particular endpoint data
  # Last updated by    :  Alex Alipoyo      
  # Last updated on    :  06 Oct 2021
**************************************************/

Cypress.Commands.add("getEndpointData", (method, url, alias) => {
    cy.intercept(method, url, (req) => {
      req.on('before:response', (res) => {
          // force all API responses to not be cached
          res.headers['cache-control'] = 'no-store'
      })
    }).as(alias)
  })

/**************************************************
Below command will return number of milliseconds 
since 1970/01/01. It can be used to calculate 
duration between two points.

  # Last updated by    :  Alex Alipoyo      
  # Last updated on    :  06 Oct 2021
**************************************************/

Cypress.Commands.add('logTime', () => {
    let time = new Date().getTime()
    return time
  });