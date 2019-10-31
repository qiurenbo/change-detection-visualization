import {
  Component,
  OnInit,
  Input,
  NgZone,
  DoCheck,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Renderer2,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent
  implements OnInit, DoCheck, AfterViewChecked, OnChanges {
  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  @Input() branch: number;
  @Input() deep: number;
  @Input() isRoot = false;
  @Input() pass: number;
  @Input() max = 3;
  @Input() data: any;

  @ViewChild("node", { read: ElementRef, static: true })
  nodeRef: ElementRef;

  @ViewChild("tip", { read: ElementRef, static: true })
  tipRef: ElementRef;

  branches: Array<number> = [];
  level: number;
  startTime = 500;
  timeInterval = 500;
  ngOnInit() {
    this.level = this.max - this.deep;
    this.deep--;
    for (let i = 0; i < this.branch; i++) {
      this.branches.push(i);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.addClass(this.nodeRef.nativeElement, "trigger");
        this.tipRef.nativeElement.innerText = "change detected";
      }, this.startTime * (this.level + 1));
    });
  }
  ngDoCheck(): void {
    // console.log(`node-${this.deep} do check now`);
    // this.zone.runOutsideAngular(() => {
    //   window.setTimeout(() => {
    //     this.renderer.addClass(this.nodeRef.nativeElement, "trigger");
    //     this.tipRef.nativeElement.innerText = "detector trigger";
    //   }, this.startTime * (this.level + 1));
    // });
  }

  ngAfterViewChecked(): void {
    console.log(`node-${this.deep} finish check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.removeClass(this.nodeRef.nativeElement, "trigger");
        this.tipRef.nativeElement.innerText = "";
      }, this.startTime * (this.level + 1) + this.timeInterval);
    });
  }
}
