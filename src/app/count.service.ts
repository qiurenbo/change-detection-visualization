import { Injectable } from "@angular/core";

@Injectable()
export class CountService {
  _count = 0;

  get count() {
    console.log(this._count);
    return this._count++;
  }
  set count(value) {
    this._count = value;
  }
}
