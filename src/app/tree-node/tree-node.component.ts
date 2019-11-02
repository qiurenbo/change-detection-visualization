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
import { CountService } from "../count.service";

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnInit, DoCheck, AfterViewChecked {
  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private countService: CountService
  ) {}

  @Input() branch: number;
  @Input() deep: number;
  @Input() isRoot = false;
  @Input() byVal: number;
  @Input() max: number;
  @Input() byRef: any;

  @ViewChild("node", { read: ElementRef, static: true })
  nodeRef: ElementRef;

  branches: Array<number> = [];
  level: number;
  interval = 400;

  ngOnInit() {
    this.level = this.max - this.deep;
    this.deep--;
    for (let i = 0; i < this.branch; i++) {
      this.branches.push(i);
    }
  }

  onValChange(e) {
    this.countService.count = 0;
    this.byVal = e.target.value;
  }

  onRefChange(e) {
    this.countService.count = 0;
    this.byRef.id = e.target.value;
    // this.cd.markForCheck();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(`node-${this.deep} do changes now`);
  //   this.zone.runOutsideAngular(() => {
  //     window.setTimeout(() => {
  //       this.renderer.addClass(this.nodeRef.nativeElement, "trigger");
  //       this.tipRef.nativeElement.innerText = "change detected";
  //     }, this.interval * this.countService.count);
  //   });
  // }
  ngDoCheck(): void {
    console.log(`node-${this.deep} do check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.addClass(this.nodeRef.nativeElement, "trigger");
      }, this.interval * this.countService.count);
    });
  }

  ngAfterViewChecked(): void {
    console.log(`node-${this.deep} finish check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.removeClass(this.nodeRef.nativeElement, "trigger");
      }, this.interval * this.countService.count);
    });
  }
}
