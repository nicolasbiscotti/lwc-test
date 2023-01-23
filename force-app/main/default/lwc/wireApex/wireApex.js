import { LightningElement, wire } from "lwc";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";

export default class WireApex extends LightningElement {
  errors;
  accountList;

  @wire(getAccountList)
  wiredAccount({ error, data }) {
    if (error) {
      this.errors = error;
      this.accountList = undefined;
    } else if (data) {
      this.accountList = data;
      this.errors = undefined;
    }
  }
}
