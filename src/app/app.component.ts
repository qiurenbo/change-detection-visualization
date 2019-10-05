import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  NgZone
} from "@angular/core";
import { TreeNodeComponent } from "./tree-node/tree-node.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.resetView();
    }, 1000);
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
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log(`app-component do check now`);
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log(`app-component finish check now`);
  }
}
