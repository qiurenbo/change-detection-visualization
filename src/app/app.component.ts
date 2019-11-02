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
import { CountService } from "./count.service";

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

  data = { id: 1 };
  title = "change-detection-visualization";
  deep = 3;
  branch = 2;
  pass = 3;
  interval = 200;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private countService: CountService
  ) {}

  ngOnInit(): void {}
  onInputChange(e) {
    this.countService.count = 0;
    this.pass = e.target.value;
  }

  onChangeData(value: number) {
    this.data.id = value;
  }

  ngDoCheck(): void {
    console.log(`app-component do check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.addClass(this.appNodeRef.nativeElement, "trigger");
      }, this.interval * this.countService.count);
    });
  }

  ngAfterViewChecked(): void {
    console.log(`app-component finish check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.removeClass(this.appNodeRef.nativeElement, "trigger");
      }, this.interval * this.countService.count);
    });
  }
}
