import { createElement } from "lwc";
import WireApex from "c/wireApex";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";

const mockGetAccountList = require("./data/getAccountList.json");
const mockGetAccountListNoRecords = require("./data/getAccountListNoRecords.json");

jest.mock(
  "@salesforce/apex/AccountController.getAccountList",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("c-wire-apex", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe("getAccountList @wire error", () => {
    it("shows the error message", () => {
      const element = createElement("c-wire-apex", {
        is: WireApex
      });
      document.body.appendChild(element);
      getAccountList.error();
      return Promise.resolve().then(() => {
        const errorElement = element.shadowRoot.querySelector("p");
        expect(errorElement.textContent).toBe("Conexion Error!");
      });
    });
  });

  describe("getAccountList @wire data", () => {
    it("renders no items when no records ar returned", () => {
      const element = createElement("c-wire.apex", {
        is: WireApex
      });
      document.body.appendChild(element);
      getAccountList.emit(mockGetAccountListNoRecords);
      return Promise.resolve().then(() => {
        const accountElements = element.shadowRoot.querySelectorAll("p");
        expect(accountElements.length).toBe(0);
      });
    });

    it("renders six records", () => {
      const element = createElement("c-wire-apex", {
        is: WireApex
      });
      document.body.appendChild(element);
      getAccountList.emit(mockGetAccountList);

      return Promise.resolve().then(() => {
        const accountElements = element.shadowRoot.querySelectorAll("p");
        expect(accountElements.length).toBe(6);
        expect(accountElements[0].textContent).toBe("Edge Communications");
      });
    });
  });
});
