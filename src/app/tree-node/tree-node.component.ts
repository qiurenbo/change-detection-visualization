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
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnInit, DoCheck, AfterViewChecked {
  constructor(private zone: NgZone, private renderer: Renderer2) {}

  @Input() branch: number;
  @Input() deep: number;
  @Input() isRoot = false;
  @Input() pass: number;
  @Input() max = 3;

  @ViewChild("node", { read: ElementRef, static: true })
  nodeRef: ElementRef;

  branches: Array<number> = [];
  level: number;

  ngOnInit() {
    this.level = this.max - this.deep;
    this.deep--;
    for (let i = 0; i < this.branch; i++) {
      this.branches.push(i);
    }
  }

  ngDoCheck(): void {
    console.log(`node-${this.deep} do check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.addClass(this.nodeRef.nativeElement, "trigger");
      }, 500 * (this.level + 1));
    });
  }

  ngAfterViewChecked(): void {
    console.log(`node-${this.deep} finish check now`);
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this.renderer.removeClass(this.nodeRef.nativeElement, "trigger");
      }, 500 * (this.level + 1) + 500);
    });
  }
}
