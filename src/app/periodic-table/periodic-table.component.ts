import { DataSource } from '@angular/cdk/collections';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
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
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = PERIODIC_TABLE_DATA;
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
        const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
        moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
        this.table.renderRows();
    }
}

export class ExampleDataSource extends DataSource<PeriodicElement> {
    /** Stream of data that is provided to the table. */
    data = new BehaviorSubject<PeriodicElement[]>(PERIODIC_TABLE_DATA);

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<PeriodicElement[]> {
        return this.data;
    }

    disconnect() {}
}
