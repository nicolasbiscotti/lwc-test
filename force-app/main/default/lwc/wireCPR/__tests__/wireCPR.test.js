import { createElement } from "lwc";
import WireCPR from "c/wireCPR";
import { CurrentPageReference } from "lightning/navigation";

const mockCurrentPageReference = require("./data/CurrentPageReference.json");

describe("c-wire-cpr", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("reders the current page reference in <pre> tag", () => {
    const element = createElement("c-wire-cpr", {
      is: WireCPR
    });

    document.body.appendChild(element);
    const pre = element.shadowRoot.querySelector("pre");
    expect(pre).not.toBeNull();

    CurrentPageReference.emit(mockCurrentPageReference);

    return Promise.resolve().then(() => {
      expect(pre.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });
});
