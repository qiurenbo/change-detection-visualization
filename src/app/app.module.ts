import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TreeNodeComponent } from "./tree-node/tree-node.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { CountService } from "./count.service";

@NgModule({
  declarations: [AppComponent, TreeNodeComponent],
  imports: [BrowserModule, NzCardModule, FlexLayoutModule, FormsModule],
  providers: [CountService],
  bootstrap: [AppComponent]
})
export class AppModule {}
