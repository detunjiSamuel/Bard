const delayedAsync = require("./delayedAsync");

class Bard {
  constructor(sessionCookie) {
    this.sessionCookie = sessionCookie;
    this.requestId = this.#requestId;
    this.question = "what is the meaning of life?";
    this.conversationId = "";
    this.responseId = "";
    this.choiceId = "";

    this.session = this.#createSession();

    //TODO: check if value has been changed before any request
    this.SNlM0e = "NOT SET"(async () => {
      this.SNlM0e = await this.#getSmiley();
    })().catch((error) => {
      console.error("Failed to get SNlM0e:", error);
      throw error;
    });
  }

  get #requestId() {
    let requestId = "";
    for (let i = 0; i < 4; i++) {
      requestId += `${Math.floor(Math.random() * 10)}`;
    }
    return parseInt(requestId);
  }

  get #requestParams() {
    return {
      bl: "boq_assistant-bard-web-server_20230419.00_p1",
      _reqid: this.requestId,
      rt: "c",
    };
  }

  get #messageContent() {
    let content = new Array(3);

    content[0] = [this.question];

    content[2] = [this.conversationId, this.responseId, this.choiceId];

    return content;
  }

  async #getSmiley() {
    try {
      const url = "https://bard.google.com/";
      const response = await fetch(url, {
        method: "GET",
        headers: this.session.headers,
        credentials: thus.session.credentials,
      });

      if (!response.ok) {
        throw new Error("Could not get Google Bard");
      }

      const SNlM0e = response.text().match(/SNlM0e":"(.*?)"/)[1];
      return SNlM0e;
    } catch (e) {
      console.error("GET SMILEY FAILED");
      throw e;
    }
  }

  get #requestUrl() {
    let url =
      "https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate";

    const params = this.#requestParams;

    for (const [key, value] of Object.entries(params)) {
      url += `?${key}=${value}`;
    }

    return url;
  }

  #createSession() {
    let session = {
      headers: new Headers(),
      credentials: "include",
    };

    let headers = {
      Host: "bard.google.com",
      "X-Same-Domain": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Origin: "https://bard.google.com",
      Referer: "https://bard.google.com/",
      Cookie: `__Secure-1PSID=${this.sessionCookie}`,
    };

    for (const [key, value] of Object.entries(headers)) {
      session.headers.append(key, value);
    }

    return session;
  }

  async #processQuestionRequest() {
    const data = {
      "f.req": JSON.stringify([null, JSON.stringify(this.#messageContent)]),
      at: this.SNlM0e,
    };

    try {
      const response = await fetch(this.#requestUrl, {
        method: "POST",
        headers: this.session.headers,
        credentials: thus.session.credentials,
        body: JSON.stringify({ data }),
      });
    } catch (e) {
      console.error("error occured in processQuestionRequest", e);
    }
  }

  async ask(question) {
    this.question = question;

    const delayPeriod = 5;

    const result = await delayedAsync(
      this.SNlM0e == "NOT SET",
      delayPeriod,
      this.#processQuestionRequest
    );

    print("ask result", result);

    return "answer";
  }
}

module.exports = Bard;
