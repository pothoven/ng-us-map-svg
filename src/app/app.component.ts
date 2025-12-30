/**
 * Clickable US Map SVG
 *
 * This is a simple Angular application that demonstrates the usage of the
 * ng-us-map-svg component.  It imports the component and uses it in the template.
 *
 * The component is designed to be reusable and customizable. It allows you to
 * display a clickable US map using SVG paths for each state. The map is
 * interactive, and when a state is clicked, it emits an event with the state name.
 * The component can be easily integrated into any Angular application.
 *
 * When a state is clicked, a dialog is opened, displaying the state name and some
 * example data (Wikipedia page for the state). The dialog is created using Angular
 * Material's MatDialog component, and it can be customized to show any content you
 * want.
 *
 * This is an updated version of angular4-us-map-svg
 * https://github.com/bharat20185/angular4-us-map-svg
 *
 */

import { Component, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
// import { UsMapComponent } from 'ng-us-map-svg';
// use the local version of the component
import { UsMapComponent } from '../../projects/ng-us-map-svg/src/lib/us-map/us-map.component'
import { StateDialogComponent } from './state-dialog/state-dialog.component';

@Component({
  selector: 'app-root',
  imports: [UsMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'US Map SVG';

  readonly dialog = inject(MatDialog);

  /**
   * usMapClick - do whatever desired when a state is clicked.
   * In this case, we open a dialog with the state name and some example data.
   *
   * @param event: { state: string } - The event emitted from the map component.
   */
  usMapClick({ state }: { state: string }) {
    const dialogRef = this.dialog.open(StateDialogComponent, {
      width: '90vw',
      data: { state },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the result from the dialog
    });
  }
}
