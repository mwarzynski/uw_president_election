describe('authentication', function() {

  it('login valid', function() {
    browser.get('http://localhost:3000/login');

    element(by.id('username')).sendKeys('mateusz');
    element(by.id('password')).sendKeys('mateuszmateusz');
    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();

    var user = browser.executeScript("return window.localStorage.getItem('user');");
    expect(user).toBeDefined();
  });

  it('logout valid', function() {
    browser.get('http://localhost:3000/login');

    element(by.id('username')).sendKeys('mateusz');
    element(by.id('password')).sendKeys('mateuszmateusz');
    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();
    browser.waitForAngular();

    browser.get('http://localhost:3000/login'); // it also logouts
    browser.waitForAngular();

    var user = browser.executeScript("return window.localStorage.getItem('user');");
    expect(user).toBeNull();
  });

  it('login invalid', function() {
    browser.get('http://localhost:3000/login');

    element(by.id('username')).sendKeys('jankowalski');
    element(by.id('password')).sendKeys('aihdsiafiiufsdf');
    element(by.css('#wrapper > ng-component > div > form > div:nth-child(3) > button')).click();
    browser.waitForAngular();

    var message = element(by.css('#wrapper > ng-component > div > form > div.alert.alert-danger')).getText();
    expect(message).toEqual("Niepoprawne dane.");
  });

});

describe('edit', function() {

  it('go through all subpages', function() {
    browser.get('http://localhost:3000/voivodeship/1');
    browser.waitForAngular();
    var precinct = element(by.css('#wrapper > ng-component > pages > section > ul > li:nth-child(1) > a'));
    expect(precinct.isPresent()).toBe(true);
    precinct.click();
    browser.waitForAngular();
    var borough = element(by.css('#wrapper > ng-component > pages > section > ul > li:nth-child(5) > a'));
    expect(borough.isPresent()).toBe(true);
    borough.click();
    browser.waitForAngular();

    var edit_link = element(by.css('#circuits > table > tbody > tr:nth-child(1) > td:nth-child(2) > a'));
    expect(edit_link.isPresent()).toBe(false);
  });

  it('unauthorized user cannot edit circuits', function() {
    browser.get('http://localhost:3000/borough/1000');
    browser.waitForAngular();
    expect(element(by.css('#circuits > table > tbody > tr > td:nth-child(2) > a')).isPresent()).toBe(false);
  });
});

describe('search', function() {
  it('invalid query', function() {
    browser.get('http://localhost:3000/borough/search');
    browser.waitForAngular();

    element(by.id('search')).sendKeys('a');
    element(by.css('#wrapper > borough-search > section > form > div:nth-child(2) > button')).click();
    browser.waitForAngular();

    var message = element(by.css('#wrapper > borough-search > section > form > div.alert.alert-danger')).getText();
    expect(message).toEqual('Fraza musi mieć przynajmniej trzy znaki.');
  });

  it('valid query', function() {
    browser.get('http://localhost:3000/borough/search');
    browser.waitForAngular();

    element(by.id('search')).sendKeys('iwaniska');
    element(by.css('#wrapper > borough-search > section > form > div:nth-child(2) > button')).click();
    browser.waitForAngular();

    var results = element.all(by.css('#wrapper > borough-search > section.results > ul li'));
    var one_borough = null;
    results.each(function (item) {
      expect(item.getText()).toEqual('Iwaniska');
      one_borough = item;
    });
  });

});


