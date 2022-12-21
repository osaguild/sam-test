import { lambdaHandler } from '../app';

jest.setTimeout(10000);

describe('app.handler', () => {
  it('test', async () => {
    const res = await lambdaHandler("hoge","hoge");
  });
});
