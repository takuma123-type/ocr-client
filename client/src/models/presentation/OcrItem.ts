export class OcrItem {
  readonly storeName: string;
  readonly registrationNumber: string;
  readonly phoneNumber: string;
  readonly address: string;
  readonly date: string;
  readonly amount: string;
  readonly fileName: string;

  constructor(params: {
    storeName: string;
    registrationNumber: string;
    phoneNumber: string;
    address: string;
    date: string;
    amount: string;
    fileName: string;
  }) {
    this.storeName = params.storeName;
    this.registrationNumber = params.registrationNumber;
    this.phoneNumber = params.phoneNumber;
    this.address = params.address;
    this.date = params.date;
    this.amount = params.amount;
    this.fileName = params.fileName;
  }
}