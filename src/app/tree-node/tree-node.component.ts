import {
  Component,
  OnInit,
  Input,
  NgZone,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnInit {
  constructor(private zone: NgZone) {}

  @Input() branch: number;
  @Input() deep: number;
  @Input() root = false;

  branches: Array<number> = [];

  ngOnInit() {
    this.deep--;
    for (let i = 0; i < this.branch; i++) {
      this.branches.push(i);
    }
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log(`node-${this.deep} do check now`);
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log(`node-${this.deep} finish check now`);
  }
}
