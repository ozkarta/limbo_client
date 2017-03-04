import { LimboAppPage } from './app.po';

describe('limbo-app App', function() {
  let page: LimboAppPage;

  beforeEach(() => {
    page = new LimboAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
