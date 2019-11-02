import { Injectable } from "@angular/core";

@Injectable()
export class CountService {
  private _count = 0;
  private _max = 0;

  get count() {
    // if (this._count >= this._max) this._count = 0;
    console.log(this._count);
    return this._count++;
  }
  set count(value) {
    this._count = value;
  }
  set max(value) {
    this._max = value;
  }
}
