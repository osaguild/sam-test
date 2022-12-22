import { send, receive, select } from "../app";

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
  it("query", async () => {
    const res: any = await select("hoge", "hoge");
    console.log(JSON.parse(res.body).message);
  });
});
