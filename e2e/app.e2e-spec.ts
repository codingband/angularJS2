import { WebMobileV2Page } from './app.po';

describe('web-mobile-v2 App', function() {
  let page: WebMobileV2Page;

  beforeEach(() => {
    page = new WebMobileV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
