import { api, LightningElement, wire } from "lwc";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import Name from "@salesforce/schema/Account.Name";
import Phone from "@salesforce/schema/Account.Phone";
import OwnerName from "@salesforce/schema/Account.Owner.Name";
import Industry from "@salesforce/schema/Account.Industry";

export default class WireLDS extends LightningElement {
  @api recordId;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [Name, Industry],
    optionalFields: [Phone, OwnerName]
  })
  account;

  get name() {
    return getFieldValue(this.account.data, Name);
  }
  get phone() {
    return getFieldValue(this.account.data, Phone);
  }
  get industry() {
    return getFieldValue(this.account.data, Industry);
  }
  get owner() {
    return getFieldValue(this.account.data, OwnerName);
  }
}
