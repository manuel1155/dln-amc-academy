import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { AuthService } from 'src/app/service/auth.service';

import { INavData } from '@coreui/angular';
import { ChangeDetectorRef } from '@angular/core';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
  ],
})
export class DefaultLayoutComponent implements AfterViewInit, AfterViewChecked
{
  public _navItems: INavData[] = [];
  public done = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  async ngAfterViewInit(): Promise<void> {
    console.log('ngAfterViewInit');
    await new Promise<void>((resolve, reject) => {
      this.authService.user$.subscribe(async (user) => {
        let datauser: any;
        console.log(user?.uid);
        if (user?.uid) {
          datauser = await this.authService.getUserData(user?.uid);
          for (let option of navItems) {
            if (this.authService.userData?.permisos && option.name) {
              if (
                this.authService.userData?.permisos.hasOwnProperty(option.name)
              ) {
                var perm = this.authService.userData?.permisos as any;
                if (option.children) {
                  let childPermiso = [];
                  for (let child of option.children) {
                    if (perm[option.name].hasOwnProperty(child.name)) {
                      let userchildValue = perm[option.name][
                        child.name!
                      ] as any;
                      if (userchildValue === true) {
                        childPermiso.push(child);
                      }
                    }
                  }
                  if (childPermiso.length > 0) {
                    option.children = childPermiso;
                    this._navItems.push(option);
                  }
                }
              }
            }
          }
          console.log('done true');
          this.done = true;
          resolve();
        }
      });
    });
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
