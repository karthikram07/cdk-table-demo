import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkTable } from '@angular/cdk/table';

import { PeriodicElement, PERIODIC_TABLE_DATA } from './periodic-table-data';
import _ from 'lodash';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * @title Basic CDK data-table
 */
@Component({
    selector: 'app-periodic-table',
    styleUrls: ['./periodic-table.component.css'],
    templateUrl: './periodic-table.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class PeriodicTable implements OnInit {
    @ViewChild('table', { static: false }) table: CdkTable<PeriodicElement>;
    @Input() dataSource: any = PERIODIC_TABLE_DATA;
    @Input() displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    @Input() showChild = true;
    expansionMap: any = {};

    ngOnInit() {
        _.each(this.dataSource, (data) => {
            this.expansionMap[data.position] = false;
        });
    }

    handleRowClick(row: PeriodicElement) {
        this.expansionMap[row.position] = !this.expansionMap[row.position];
    }

    dropTable(event: CdkDragDrop<PeriodicElement[]>) {
        if (event.previousContainer === event.container) {
            const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
            moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
        this.table.renderRows();
    }
}
