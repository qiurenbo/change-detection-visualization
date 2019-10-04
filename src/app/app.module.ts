import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TreeNodeComponent } from "./tree-node/tree-node.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";

@NgModule({
  declarations: [AppComponent, TreeNodeComponent],
  imports: [BrowserModule, NzCardModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
