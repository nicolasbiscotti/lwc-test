import { api, LightningElement } from "lwc";
import { sum } from "./sum";

export default class UnitTest extends LightningElement {
  privateUnitNumber = sum(2, 3);
  handleChange(event) {
    this.privateUnitNumber = event.target.value;
  }

  @api get unitNumber() {
    return this.privateUnitNumber;
  }
  set unitNumber(number) {
    this.privateUnitNumber = number;
  }
}
