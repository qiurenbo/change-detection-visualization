import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  NgZone,
  DoCheck,
  AfterViewChecked,
  OnInit,
  Renderer2,
  ElementRef
} from "@angular/core";
import { TreeNodeComponent } from "./tree-node/tree-node.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
  @ViewChild("viewContainer", { read: ViewContainerRef, static: false })
  viewContainerRef: ViewContainerRef;

  @ViewChild("viewTemplate", { read: TemplateRef, static: false })
  templateRef: TemplateRef<TreeNodeComponent>;

  @ViewChild("appNode", { read: ElementRef, static: true })
  appNodeRef: ElementRef;

  @ViewChild("tip", { read: ElementRef, static: true })
  tipRef: ElementRef;

  data = { id: 1 };
  title = "change-detection-visualization";
  deep = 3;
  branch = 2;
  pass = 3;
  startTime = 0;
  timeInterval = 500;
  constructor(private zone: NgZone, private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.createView();
    }, 1);
  }
  onButtonClick() {}
  onChangeDeep(value: number) {
    this.deep = value;
    this.createView();
  }

  onChangeBranch(value: number) {
    this.branch = value;
    this.createView();
  }

  onChangeData(value: number) {
    this.data.id = value;
    this.createView();
  }

  createView() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  ngDoCheck(): void {
    console.log(`app-component do check now`);

    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.addClass(this.appNodeRef.nativeElement, "trigger");
        this.tipRef.nativeElement.innerText = "detector trigger";
      }, this.startTime);
    });
  }

  ngAfterViewChecked(): void {
    console.log(`app-component finish check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.removeClass(this.appNodeRef.nativeElement, "trigger");
        this.tipRef.nativeElement.innerText = "";
      }, this.startTime + this.timeInterval);
    });
    // this.renderer.removeClass(this.appNodeRef.nativeElement, "trigger");
  }
}
