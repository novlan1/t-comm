import { matchParams } from '../../src/router/match-params';

describe('matchParams', () => {
  it('matchParams', () => {
    const params = {
      childid: '123',
      inviteteamid: '222',
    };
    expect(matchParams('/match/match-detail-index/:childid/:inviteteamid?', params))
      .toBe('/match/match-detail-index/123/222');

    expect(matchParams('/match/match-detail-index/:inviteteamid?', params))
      .toBe('/match/match-detail-index/222');

    expect(matchParams('/match/match-detail-index/:childid/:inviteteamid/', params))
      .toBe('/match/match-detail-index/123/222/');

    expect(matchParams('/match/match-detail-index', params))
      .toBe('/match/match-detail-index');
  });
});
