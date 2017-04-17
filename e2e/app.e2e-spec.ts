import { SupportTicketPage } from './app.po';

describe('support-ticket App', () => {
  let page: SupportTicketPage;

  beforeEach(() => {
    page = new SupportTicketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
