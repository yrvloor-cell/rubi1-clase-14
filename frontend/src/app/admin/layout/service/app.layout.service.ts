import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  _config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14
  };

  config = signal<AppConfig>(this._config);

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  };

  private configUpdate = new Subject<AppConfig>();
  private overlayOpen = new Subject<void>();

  configUpdate$ = this.configUpdate.asObservable();
  overlayOpen$ = this.overlayOpen.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const config = this.config();
      if (this.updateStyle(config)) {
        this.changeTheme();
      }
      this.changeScale(config.scale);
      this.onConfigUpdate();
    });
  }

  updateStyle(config: AppConfig): boolean {
    return config.theme !== this._config.theme ||
      config.colorScheme !== this._config.colorScheme;
  }

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) this.overlayOpen.next();
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;
      if (this.state.staticMenuMobileActive) this.overlayOpen.next();
    }
  }

  showProfileSidebar(): void {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) this.overlayOpen.next();
  }

  showConfigSidebar(): void {
    this.state.configSidebarVisible = true;
  }

  isOverlay(): boolean {
    return this.config().menuMode === 'overlay';
  }

  isDesktop(): boolean {
    return this.document.defaultView ? this.document.defaultView.innerWidth > 991 : true;
  }

  isMobile(): boolean {
    return !this.isDesktop();
  }

  onConfigUpdate(): void {
    this._config = { ...this.config() };
    this.configUpdate.next(this.config());
  }

  changeTheme(): void {
    // El tema Lara-Light-Indigo se carga desde angular.json.
    // Se conserva el método para no romper el panel de configuración de Sakai.
    const themeLink = this.document.getElementById('theme-css') as HTMLLinkElement | null;
    if (!themeLink) return;

    const config = this.config();
    const href = themeLink.getAttribute('href') || '';
    const updatedHref = href
      .replace(this._config.theme, config.theme)
      .replace(`theme-${this._config.colorScheme}`, `theme-${config.colorScheme}`);
    themeLink.setAttribute('href', updatedHref);
  }

  changeScale(value: number): void {
    this.document.documentElement.style.fontSize = `${value}px`;
  }
}
