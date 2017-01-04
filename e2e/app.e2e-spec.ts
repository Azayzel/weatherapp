import { NgweatherPage } from './app.po';

describe('ngweather App', function() {
  let page: NgweatherPage;

  beforeEach(() => {
    page = new NgweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
