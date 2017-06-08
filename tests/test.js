//describe('authentication', function() {
//  it('login valid', function() {
//    browser.get('http://localhost:3000/login');
//
//    element(by.id('username')).sendKeys('mateusz');
//    element(by.id('password')).sendKeys('mateuszmateusz');
//    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();
//
//    var user = browser.executeScript("return window.localStorage.getItem('user');");
//    expect(user).toBeDefined();
//  });
//
//  it('logout valid', function() {
//    browser.get('http://localhost:3000/login');
//
//    element(by.id('username')).sendKeys('mateusz');
//    element(by.id('password')).sendKeys('mateuszmateusz');
//    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();
//    browser.sleep(1000);
//
//    browser.get('http://localhost:3000/login'); // it also logouts
//    browser.sleep(1000);
//
//    var user = browser.executeScript("return window.localStorage.getItem('user');");
//    expect(user).toBeNull();
//  });
//
//  it('login invalid', function() {
//    browser.get('http://localhost:3000/login');
//
//    element(by.id('username')).sendKeys('jankowalski');
//    element(by.id('password')).sendKeys('aihdsiafiiufsdf');
//    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();
//    browser.sleep(1000);
//
//    var message = element(by.css('#wrapper > ng-component > div > form > div.alert.alert-danger')).getText();
//    expect(message).toEqual("Niepoprawne dane.");
//  });
//
//});

describe('edit', function() {
  it('unauthorized user cannot edit circuits', function() {
    browser.get('http://localhost:3000/borough/1000');
    browser.waitForAngular();
    expect(element(by.css('#circuits > table > tbody > tr > td:nth-child(2) > a')).isPresent()).toBe(false);
  });
});

//describe('search', function() {
//  it('invalid query', function() {
//    browser.get('http://localhost:3000/borough/search');
//    browser.sleep(1000);
//
//    element(by.id('search')).sendKeys('a');
//    element(by.css('#wrapper > borough-search > section > form > div:nth-child(2) > button')).click();
//    browser.sleep(1000);
//
//    var message = element(by.css('#wrapper > borough-search > section > form > div.alert.alert-danger')).getText();
//    expect(message).toEqual('Fraza musi mieć przynajmniej trzy znaki.');
//  });
//
//  it('valid query', function() {
//    browser.get('http://localhost:3000/borough/search');
//    browser.sleep(1000);
//
//    element(by.id('search')).sendKeys('iwaniska');
//    element(by.css('#wrapper > borough-search > section > form > div:nth-child(2) > button')).click();
//    browser.sleep(1000);
//
//    var results = element.all(by.css('#wrapper > borough-search > section.results > ul li'));
//    results.each(function (item) {
//      expect(item.getText()).toEqual('Iwaniska');
//    });
//  });
//
//});


