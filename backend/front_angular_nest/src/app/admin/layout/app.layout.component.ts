import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { LayoutService } from './service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopBarComponent } from './app.topbar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: (() => void) | null = null;
  profileMenuOutsideClickListener: (() => void) | null = null;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
  @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen(this.document, 'click', (event: Event) => {
          const target = event.target as Node;
          const sidebar = this.appSidebar?.el?.nativeElement;
          const menuButton = this.appTopbar?.menuButton?.nativeElement;
          const isOutsideClicked = !!sidebar && !!menuButton &&
            !sidebar.isSameNode(target) && !sidebar.contains(target) &&
            !menuButton.isSameNode(target) && !menuButton.contains(target);

          if (isOutsideClicked) this.hideMenu();
        });
      }

      if (!this.profileMenuOutsideClickListener) {
        this.profileMenuOutsideClickListener = this.renderer.listen(this.document, 'click', (event: Event) => {
          const target = event.target as Node;
          const menu = this.appTopbar?.menu?.nativeElement;
          const menuButton = this.appTopbar?.topbarMenuButton?.nativeElement;
          const isOutsideClicked = !!menu && !!menuButton &&
            !menu.isSameNode(target) && !menu.contains(target) &&
            !menuButton.isSameNode(target) && !menuButton.contains(target);

          if (isOutsideClicked) this.hideProfileMenu();
        });
      }

      if (this.layoutService.state.staticMenuMobileActive) this.blockBodyScroll();
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }

  hideMenu(): void {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    this.menuOutsideClickListener?.();
    this.menuOutsideClickListener = null;
    this.unblockBodyScroll();
  }

  hideProfileMenu(): void {
    this.layoutService.state.profileSidebarVisible = false;
    this.profileMenuOutsideClickListener?.();
    this.profileMenuOutsideClickListener = null;
  }

  blockBodyScroll(): void {
    this.document.body.classList.add('blocked-scroll');
  }

  unblockBodyScroll(): void {
    this.document.body.classList.remove('blocked-scroll');
  }

  get containerClass(): Record<string, boolean> {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple
    };
  }

  ngOnDestroy(): void {
    this.overlayMenuOpenSubscription?.unsubscribe();
    this.menuOutsideClickListener?.();
    this.profileMenuOutsideClickListener?.();
  }
}
