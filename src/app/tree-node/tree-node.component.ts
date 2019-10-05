import {
  Component,
  OnInit,
  Input,
  NgZone,
  DoCheck,
  AfterViewChecked,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnInit, DoCheck, AfterViewChecked {
  constructor(private zone: NgZone) {}

  @Input() branch: number;
  @Input() deep: number;
  @Input() isRoot = false;
  @Input() pass: number;

  branches: Array<number> = [];

  ngOnInit() {
    this.deep--;
    for (let i = 0; i < this.branch; i++) {
      this.branches.push(i);
    }
  }

  ngDoCheck(): void {
    console.log(`node-${this.deep} do check now`);
  }

  ngAfterViewChecked(): void {
    console.log(`node-${this.deep} finish check now`);
  }
}
