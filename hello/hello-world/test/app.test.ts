import { send, receive } from "../app";

jest.setTimeout(10000);

describe("app", () => {
  it("send", async () => {
    const res: any = await send("hoge", "hoge");
    console.log(JSON.parse(res.body).message);
  });
  it("receive", async () => {
    const res: any = await receive("hoge", "hoge");
    console.log(JSON.parse(res.body).message);
  });
});
