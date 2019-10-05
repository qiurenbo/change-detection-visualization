import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  NgZone,
  DoCheck,
  AfterViewChecked,
  OnInit
} from "@angular/core";
import { TreeNodeComponent } from "./tree-node/tree-node.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
  @ViewChild("container", { read: ViewContainerRef, static: false })
  viewContainerRef: ViewContainerRef;

  @ViewChild("tree", { read: TemplateRef, static: false })
  templateRef: TemplateRef<TreeNodeComponent>;

  title = "change-detection-visualization";
  deep = 3;
  branch = 2;
  pass = 3;
  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.resetView();
    }, 10);
  }
  onButtonClick() {}
  onChangeDeep(value: number) {
    this.deep = value;
    this.resetView();
  }

  onChangeBranch(value: number) {
    this.branch = value;
    this.resetView();
  }

  resetView() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  ngDoCheck(): void {
    console.log(`app-component do check now`);
  }

  ngAfterViewChecked(): void {
    console.log(`app-component finish check now`);
  }
}
